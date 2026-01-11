import { json } from '@sveltejs/kit';
import { getAllTeamMembers, getTeamMemberCount, createTeamMember } from '$lib/api/services/teamService';
import { requireRole } from '$lib/api/auth';
import { successResponse, handleError, validationError } from '$lib/api/utils';
import type { CreateTeamMemberRequest } from '$lib/api/types';

export async function GET({ url }) {
	try {
		// Получение параметров запроса
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
		
		// Получение членов команды
		const teamMembers = await getAllTeamMembers(limit, offset);
		const totalCount = await getTeamMemberCount();
		
		// Подготовка данных пагинации
		const totalPages = Math.ceil(totalCount / limit);
		
		const response = {
			data: teamMembers,
			pagination: {
				page,
				limit,
				total: totalCount,
				totalPages,
				hasNext: page < totalPages,
				hasPrev: page > 1
			}
		};
		
		return successResponse(response, 'Члены команды успешно получены');
		
	} catch (error) {
		return handleError(error, 'Ошибка при получении членов команды');
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
		const body: CreateTeamMemberRequest = await request.json();
		
		// Валидация обязательных полей
		if (!body.name || !body.role || !body.bio) {
			return validationError('Имя, роль и биография обязательны');
		}
		
		// Создание члена команды
		const newMember = await createTeamMember(body);
		
		return successResponse(newMember, 'Член команды успешно создан');
		
	} catch (error) {
		return handleError(error, 'Ошибка при создании члена команды');
	}
}