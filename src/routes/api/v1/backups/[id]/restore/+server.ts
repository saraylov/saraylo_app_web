import { json } from '@sveltejs/kit';
import { requireRole } from '$lib/api/auth';
import { successResponse, handleError, notFoundError, validationError } from '$lib/api/utils';
import { backupStore } from '$lib/api/services/backupService';
import { restoreDataFromBackup } from '$lib/api/services/dataRestoreService';

// Восстановление данных из бэкапа
export async function POST({ params, request }) {
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
        
        // Получение бэкапа через сервис
        const backup = backupStore.getBackupById(id);
        
        if (!backup) {
            return notFoundError('Бэкап не найден');
        }
        
        // Парсинг тела запроса для получения параметров восстановления
        let body: { restoreDataTypes?: string[] } = {};
        try {
            body = await request.json();
        } catch (e) {
            // Если нет тела запроса, используем значения по умолчанию
        }
        
        const restoreDataTypes = body.restoreDataTypes || backup.dataTypes;
        
        // Проверка допустимых типов данных для восстановления
        const validRestoreTypes = restoreDataTypes.filter((type: string) => 
            backup.dataTypes.includes(type)
        );
        
        if (validRestoreTypes.length === 0) {
            return validationError('Нет допустимых типов данных для восстановления');
        }
        
        // Реальное восстановление данных
        const restoreResult = await restoreDataFromBackup(id, validRestoreTypes);
        
        if (!restoreResult.success) {
            return handleError(new Error(restoreResult.message), 'Ошибка при восстановлении данных');
        }
        
        // Обновление информации о восстановлении в бэкапе
        const restoreRecord = {
            restoredAt: new Date().toISOString(),
            restoredBy: 'admin', // В production здесь будет ID пользователя
            restoredDataTypes: validRestoreTypes,
            restoreId: `restore_${Date.now()}`,
            restoredItems: restoreResult.restoredItems
        };
        
        // Обновление информации о восстановлении через сервис
        const updatedBackup = backupStore.updateBackup(id, {
            restoreHistory: [...(backup.restoreHistory || []), restoreRecord],
            restoreCount: (backup.restoreCount || 0) + 1,
            lastRestoredAt: new Date().toISOString()
        });
        
        const responseResult = {
            backupId: updatedBackup!.id,
            restoredDataTypes: validRestoreTypes,
            restoredItems: restoreResult.restoredItems,
            restoreTime: new Date().toISOString(),
            message: restoreResult.message
        };
        
        return successResponse(responseResult, 'Данные успешно восстановлены из бэкапа');
        
    } catch (error) {
        return handleError(error, 'Ошибка при восстановлении данных из бэкапа');
    }
}