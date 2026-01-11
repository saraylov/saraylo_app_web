import { json } from '@sveltejs/kit';
import { getAllProducts, getProductCount, createProduct } from '$lib/api/services/productService';
import { requireRole } from '$lib/api/auth';
import { successResponse, handleError, validationError } from '$lib/api/utils';
import type { CreateProductRequest } from '$lib/api/types';

export async function GET({ url }) {
	try {
		// Получение параметров запроса
		const search = url.searchParams.get('search') || undefined;
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
		
		// Получение продуктов
		const products = await getAllProducts(search, limit, offset);
		const totalCount = await getProductCount();
		
		// Подготовка данных пагинации
		const totalPages = Math.ceil(totalCount / limit);
		
		const response = {
			data: products,
			pagination: {
				page,
				limit,
				total: totalCount,
				totalPages,
				hasNext: page < totalPages,
				hasPrev: page > 1
			}
		};
		
		return successResponse(response, 'Продукты успешно получены');
		
	} catch (error) {
		return handleError(error, 'Ошибка при получении продуктов');
	}
}

export async function POST({ request }) {
	try {
		// Проверка аутентификации и прав доступа (только админ)
		const authResult = requireRole(['admin'])(request);
		
		if (authResult instanceof Response) {
			return authResult;
		}
		
		// Парсинг тела запроса
		const body: CreateProductRequest = await request.json();
		
		// Валидация обязательных полей
		if (!body.name || !body.description || !body.type) {
			return validationError('Название, описание и тип обязательны');
		}
		
		// Создание продукта
		const newProduct = await createProduct(body);
		
		return successResponse(newProduct, 'Продукт успешно создан');
		
	} catch (error) {
		return handleError(error, 'Ошибка при создании продукта');
	}
}