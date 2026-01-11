import { json } from '@sveltejs/kit';
import { deleteProduct } from '$lib/api/services/productService';
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
			return notFoundError('ID продукта обязателен');
		}
		
		// Удаление продукта
		const deleted = await deleteProduct(id);
		
		if (!deleted) {
			return notFoundError('Продукт не найден');
		}
		
		return successResponse(null, 'Продукт успешно удален');
		
	} catch (error) {
		return handleError(error, 'Ошибка при удалении продукта');
	}
}