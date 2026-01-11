import { json } from '@sveltejs/kit';
import { updateProduct, deleteProduct, getProductById } from '$lib/api/services/productService';
import { requireRole } from '$lib/api/auth';
import { successResponse, handleError, notFoundError, validationError, unauthorizedError } from '$lib/api/utils';

export async function GET({ params }) {
	try {
		const { id } = params;
		
		if (!id) {
			return notFoundError('ID продукта обязателен');
		}
		
		// Получение продукта по ID
		const product = await getProductById(id);
		
		if (!product) {
			return notFoundError('Продукт не найден');
		}
		
		return successResponse(product, 'Продукт успешно получен');
		
	} catch (error) {
		return handleError(error, 'Ошибка при получении продукта');
	}
}

export async function PUT({ request, params }) {
	try {
		// Проверка аутентификации и прав доступа
		const authResult = requireRole(['admin', 'editor'])(request);
		
		if (authResult instanceof Response) {
			return authResult;
		}
		
		const { id } = params;
		
		if (!id) {
			return notFoundError('ID продукта обязателен');
		}
		
		// Парсинг тела запроса
		const body = await request.json();
		
		// Обновление продукта
		const updatedProduct = await updateProduct(id, body);
		
		if (!updatedProduct) {
			return notFoundError('Продукт не найден');
		}
		
		return successResponse(updatedProduct, 'Продукт успешно обновлен');
		
	} catch (error) {
		return handleError(error, 'Ошибка при обновлении продукта');
	}
}

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