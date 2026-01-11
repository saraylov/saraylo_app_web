import { json } from '@sveltejs/kit';
import { requireRole } from '$lib/api/auth';
import { successResponse, handleError, notFoundError, validationError } from '$lib/api/utils';
import { backupStore } from '$lib/api/services/backupService';

// Получение конкретного бэкапа по ID
export async function GET({ params, request }) {
    try {
        // Проверка аутентификации
        const authResult = requireRole(['admin', 'editor'])(request);
        
        if (authResult instanceof Response) {
            return authResult;
        }
        
        const { id } = params;
        
        if (!id) {
            return notFoundError('ID бэкапа обязателен');
        }
        
        // Получение бэкапа через сервис
        const backup = backupStore.getBackupById(id);
        
        if (!backup) {
            return notFoundError('Бэкап не найден');
        }
        
        return successResponse(backup, 'Бэкап успешно получен');
        
    } catch (error) {
        return handleError(error, 'Ошибка при получении бэкапа');
    }
}

// Удаление бэкапа
export async function DELETE({ params, request }) {
    try {
        // Проверка аутентификации и прав доступа
        const authResult = requireRole(['admin'])(request);
        
        if (authResult instanceof Response) {
            return authResult;
        }
        
        const { id } = params;
        
        if (!id) {
            return notFoundError('ID бэкапа обязателен');
        }
        
        // Удаление бэкапа через сервис
        const deletedBackup = backupStore.deleteBackup(id);
        
        if (!deletedBackup) {
            return notFoundError('Бэкап не найден');
        }
        
        return successResponse(deletedBackup, 'Бэкап успешно удален');
        
    } catch (error) {
        return handleError(error, 'Ошибка при удалении бэкапа');
    }
}