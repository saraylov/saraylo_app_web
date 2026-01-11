import { json } from '@sveltejs/kit';
import { requireRole } from '$lib/api/auth';
import { successResponse, handleError, validationError, unauthorizedError } from '$lib/api/utils';
import { backupStore, initializeDemoBackups } from '$lib/api/services/backupService';
import { getAllProducts } from '$lib/api/services/productService';
import { getAllTeamMembers } from '$lib/api/services/teamService';
import { getAllNavigationItems } from '$lib/api/services/navigationService';

// Инициализация демо данных при первом запуске
initializeDemoBackups();

// Получение всех бэкапов
export async function GET({ request }) {
    try {
        // Проверка аутентификации
        const authResult = requireRole(['admin', 'editor'])(request);
        
        if (authResult instanceof Response) {
            return authResult;
        }
        
        // Получение всех бэкапов через сервис
        const allBackups = backupStore.getAllBackups();
        
        // Расчет статистики
        const stats = backupStore.getStats();
        
        const response = {
            data: allBackups,
            stats: stats
        };
        
        return successResponse(response, 'Бэкапы успешно получены');
        
    } catch (error) {
        return handleError(error, 'Ошибка при получении бэкапов');
    }
}

// Создание нового бэкапа
export async function POST({ request }) {
    try {
        // Проверка аутентификации и прав доступа
        const authResult = requireRole(['admin'])(request);
        
        if (authResult instanceof Response) {
            return authResult;
        }
        
        // Парсинг тела запроса
        const body = await request.json();
        const { description, dataTypes } = body;
        
        // Валидация входных данных
        if (!dataTypes || !Array.isArray(dataTypes) || dataTypes.length === 0) {
            return validationError('Необходимо указать хотя бы один тип данных для бэкапа');
        }
        
        // Проверка допустимых типов данных
        const validTypes = ['products', 'team', 'navigation', 'settings'];
        const invalidTypes = dataTypes.filter(type => !validTypes.includes(type));
        
        if (invalidTypes.length > 0) {
            return validationError(`Недопустимые типы данных: ${invalidTypes.join(', ')}`);
        }
        
        // Получение реальных данных для бэкапа
        const backupData: Record<string, any> = {};
        let totalSize = 0;
        
        // Получение реальных данных продуктов
        if (dataTypes.includes('products')) {
            try {
                const products = await getAllProducts();
                backupData.products = products;
                totalSize += Math.max(1, Math.ceil(products.length * 0.5)); // Оценка размера
            } catch (error) {
                console.error('Ошибка получения продуктов для бэкапа:', error);
                backupData.products = [];
            }
        }
        
        // Получение реальных данных команды
        if (dataTypes.includes('team')) {
            try {
                const teamMembers = await getAllTeamMembers();
                backupData.team = teamMembers;
                totalSize += Math.max(1, Math.ceil(teamMembers.length * 0.3)); // Оценка размера
            } catch (error) {
                console.error('Ошибка получения членов команды для бэкапа:', error);
                backupData.team = [];
            }
        }
        
        // Получение реальных данных навигации
        if (dataTypes.includes('navigation')) {
            try {
                const navigationItems = await getAllNavigationItems();
                backupData.navigation = navigationItems;
                totalSize += Math.max(1, Math.ceil(navigationItems.length * 0.2)); // Оценка размера
            } catch (error) {
                console.error('Ошибка получения навигации для бэкапа:', error);
                backupData.navigation = [];
            }
        }
        
        // Создание объекта бэкапа через сервис
        const backupToAdd = {
            description: description || `Бэкап от ${new Date().toLocaleString('ru-RU')}`,
            dataTypes: dataTypes,
            data: backupData,
            size: totalSize,
            status: 'completed',
            version: '1.0.0',
            createdAt: new Date().toISOString(),
            createdBy: 'admin' // В production здесь будет ID пользователя
        };
        
        // Добавление бэкапа через сервис
        const newBackup = backupStore.addBackup(backupToAdd);
        
        return successResponse(newBackup, 'Бэкап успешно создан');
        
    } catch (error) {
        return handleError(error, 'Ошибка при создании бэкапа');
    }
}