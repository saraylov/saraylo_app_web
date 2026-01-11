import { json } from '@sveltejs/kit';
import type { RequestHandler } from './types';

// Генерация уникального ID
export function generateId(): string {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Форматирование даты для JSON
export function formatDate(date: Date): string {
	return date.toISOString();
}

// Проверка валидности email
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Проверка валидности URL
export function isValidUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

// Валидация обязательных полей
export function validateRequiredFields(data: Record<string, any>, requiredFields: string[]): string[] {
	const missingFields: string[] = [];
	
	for (const field of requiredFields) {
		if (data[field] === undefined || data[field] === null || data[field] === '') {
			missingFields.push(field);
		}
	}
	
	return missingFields;
}

// Обработка ошибок API
export function handleError(error: unknown, message = 'Internal server error'): Response {
	console.error('API Error:', error);
	
	return json({
		success: false,
		error: message,
		timestamp: new Date().toISOString()
	}, { status: 500 });
}

// Успешный ответ
export function successResponse(data: any, message = 'Success'): Response {
	return json({
		success: true,
		data,
		message,
		timestamp: new Date().toISOString()
	});
}

// Ошибка валидации
export function validationError(message: string, details?: any): Response {
	return json({
		success: false,
		error: 'Validation error',
		message,
		details,
		timestamp: new Date().toISOString()
	}, { status: 400 });
}

// Ошибка авторизации
export function unauthorizedError(message = 'Unauthorized'): Response {
	return json({
		success: false,
		error: 'Unauthorized',
		message,
		timestamp: new Date().toISOString()
	}, { status: 401 });
}

// Ошибка доступа
export function forbiddenError(message = 'Forbidden'): Response {
	return json({
		success: false,
		error: 'Forbidden',
		message,
		timestamp: new Date().toISOString()
	}, { status: 403 });
}

// Ресурс не найден
export function notFoundError(message = 'Resource not found'): Response {
	return json({
		success: false,
		error: 'Not found',
		message,
		timestamp: new Date().toISOString()
	}, { status: 404 });
}