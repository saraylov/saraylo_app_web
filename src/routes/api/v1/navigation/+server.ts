import { json } from '@sveltejs/kit';
import { getActiveNavigationItems, getAllNavigationItems, getNavigationItemCount } from '$lib/api/services/navigationService';
import { successResponse, handleError, validationError } from '$lib/api/utils';

export async function GET({ url }) {
	try {
		// Получение параметров запроса
		const showAll = url.searchParams.get('showAll') === 'true';
		const page = parseInt(url.searchParams.get('page') || '1');
		const limit = parseInt(url.searchParams.get('limit') || '10');
		
		// Валидация параметров
		if (page < 1) {
			return validationError('Номер страницы должен быть больше 0');
		}
		
		if (limit < 1 || limit > 100) {
			return validationError('Лимит должен быть между 1 и 100');
		}
		
		// Вычисление смещения
		const offset = (page - 1) * limit;
		
		let navigationItems;
		let totalCount;
		
		if (showAll) {
			// Получение всех элементов навигации (для админов)
			navigationItems = await getAllNavigationItems(limit, offset);
			totalCount = await getNavigationItemCount();
		} else {
			// Получение только активных элементов (для публичного API)
			navigationItems = await getActiveNavigationItems();
			totalCount = navigationItems.length;
		}
		
		// Подготовка данных пагинации
		const totalPages = Math.ceil(totalCount / limit);
		
		const response = {
			data: navigationItems,
			pagination: showAll ? {
				page,
				limit,
				total: totalCount,
				totalPages,
				hasNext: page < totalPages,
				hasPrev: page > 1
			} : undefined
		};
		
		const message = showAll 
			? 'Все элементы навигации успешно получены' 
			: 'Активные элементы навигации успешно получены';
		
		return successResponse(response, message);
		
	} catch (error) {
		return handleError(error, 'Ошибка при получении элементов навигации');
	}
}