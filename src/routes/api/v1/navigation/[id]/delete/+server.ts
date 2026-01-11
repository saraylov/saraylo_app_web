import { json } from '@sveltejs/kit';
import { deleteNavigationItem } from '$lib/api/services/navigationService';
import { requireRole } from '$lib/api/auth';
import { successResponse, handleError, notFoundError, unauthorizedError } from '$lib/api/utils';

export async function DELETE({ request, params }) {
	try {
		// Проверка аутентификации и прав доступа (только админ)
		const authResult = requireRole(['admin'])(request);
		
		if (authResult instanceof Response) {
			return authResult;
		}
		
		const { id } = params;
		
		if (!id) {
			return notFoundError('ID элемента навигации обязателен');
		}
		
		// Удаление элемента навигации
		const deleted = await deleteNavigationItem(id);
		
		if (!deleted) {
			return notFoundError('Элемент навигации не найден');
		}
		
		return successResponse(null, 'Элемент навигации успешно удален');
		
	} catch (error) {
		return handleError(error, 'Ошибка при удалении элемента навигации');
	}
}