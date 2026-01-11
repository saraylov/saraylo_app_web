import { json } from '@sveltejs/kit';
import { authenticateUser, generateToken } from '$lib/api/auth';
import { validationError, successResponse, handleError } from '$lib/api/utils';
import type { LoginRequest, LoginResponse } from '$lib/api/types';

export async function POST({ request }) {
	try {
		// Парсинг тела запроса
		const body: LoginRequest = await request.json();
		
		// Валидация входных данных
		if (!body.email || !body.password) {
			return validationError('Email и пароль обязательны');
		}
		
		// Аутентификация пользователя
		const user = await authenticateUser({
			email: body.email,
			password: body.password
		});
		
		if (!user) {
			return validationError('Неверный email или пароль');
		}
		
		// Генерация токена
		const token = generateToken(user);
		
		// Подготовка ответа
		const response: LoginResponse = {
			token,
			user: {
				id: user.id,
				email: user.email,
				role: user.role,
				name: user.name
			},
			expiresIn: 24 * 60 * 60 // 24 часа в секундах
		};
		
		return successResponse(response, 'Успешная аутентификация');
		
	} catch (error) {
		return handleError(error, 'Ошибка при аутентификации');
	}
}