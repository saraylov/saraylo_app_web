import { json } from '@sveltejs/kit';
import { getTeamMemberById } from '$lib/api/services/teamService';
import { deleteTeamMember } from '$lib/api/services/teamService';
import { requireRole } from '$lib/api/auth';
import { successResponse, handleError, notFoundError, unauthorizedError } from '$lib/api/utils';

export async function GET({ params }) {
	try {
		const { id } = params;
		
		if (!id) {
			return notFoundError('ID члена команды обязателен');
		}
		
		const teamMember = await getTeamMemberById(id);
		
		if (!teamMember) {
			return notFoundError('Член команды не найден');
		}
		
		return successResponse(teamMember, 'Член команды успешно получен');
		
	} catch (error) {
		return handleError(error, 'Ошибка при получении члена команды');
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
			return notFoundError('ID члена команды обязателен');
		}
		
		// Удаление члена команды
		const deleted = await deleteTeamMember(id);
		
		if (!deleted) {
			return notFoundError('Член команды не найден');
		}
		
		return successResponse(null, 'Член команды успешно удален');
		
	} catch (error) {
		return handleError(error, 'Ошибка при удалении члена команды');
	}
}