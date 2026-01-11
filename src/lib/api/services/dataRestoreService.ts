/**
 * Сервис для реального восстановления данных из бэкапов
 * Реализует восстановление продуктов, членов команды и навигации
 */

import { 
    getAllProducts, 
    createProduct, 
    deleteProduct
} from './productService';

import { 
    getAllTeamMembers, 
    createTeamMember, 
    deleteTeamMember
} from './teamService';

import { 
    getAllNavigationItems, 
    createNavigationItem, 
    deleteNavigationItem
} from './navigationService';

import type { ApiProduct, ApiTeamMember, ApiNavigationItem, CreateProductRequest, CreateTeamMemberRequest, CreateNavigationItemRequest } from '../types';

import { backupStore } from './backupService';
import type { Backup } from './backupService';

interface RestoreResult {
    success: boolean;
    restoredItems: {
        products?: number;
        team?: number;
        navigation?: number;
    };
    errors: string[];
    message: string;
}

interface CurrentDataSnapshot {
    products: ApiProduct[];
    team: ApiTeamMember[];
    navigation: ApiNavigationItem[];
}

/**
 * Получение текущего состояния всех данных
 */
export async function getCurrentDataSnapshot(): Promise<CurrentDataSnapshot> {
    return {
        products: await getAllProducts(),
        team: await getAllTeamMembers(),
        navigation: await getAllNavigationItems()
    };
}

/**
 * Удаление всех текущих данных указанного типа
 */
async function clearCurrentData(dataType: string): Promise<void> {
    switch (dataType) {
        case 'products':
            const currentProducts = await getAllProducts();
            for (const product of currentProducts) {
                await deleteProduct(product.id);
            }
            break;
            
        case 'team':
            const currentTeam = await getAllTeamMembers();
            for (const member of currentTeam) {
                await deleteTeamMember(member.id);
            }
            break;
            
        case 'navigation':
            const currentNav = await getAllNavigationItems();
            for (const navItem of currentNav) {
                await deleteNavigationItem(navItem.id);
            }
            break;
    }
}

/**
 * Восстановление продуктов из бэкапа
 */
async function restoreProducts(productsData: any[]): Promise<number> {
    let restoredCount = 0;
    
    // Сначала очищаем текущие продукты
    await clearCurrentData('products');
    
    // Затем восстанавливаем из бэкапа
    for (const productData of productsData) {
        try {
            // Преобразуем данные из бэкапа в формат создания
            const createData: CreateProductRequest = {
                name: productData.name,
                description: productData.description,
                type: productData.type || 'desktop',
                icon: productData.icon || '📦',
                images: productData.images || [],
                features: productData.features || [],
                technologies: productData.technologies || [],
                link: productData.link,
                releaseDate: productData.releaseDate
            };
            
            await createProduct(createData);
            restoredCount++;
        } catch (error) {
            console.error(`Ошибка восстановления продукта ${productData.id}:`, error);
        }
    }
    
    return restoredCount;
}

/**
 * Восстановление членов команды из бэкапа
 */
async function restoreTeamMembers(teamData: any[]): Promise<number> {
    console.log(`Начинаем восстановление ${teamData.length} членов команды`);
    let restoredCount = 0;
    
    // Сначала очищаем текущую команду
    console.log('Очистка текущей команды...');
    await clearCurrentData('team');
    
    // Затем восстанавливаем из бэкапа
    console.log('Восстановление членов команды из бэкапа...');
    for (const memberData of teamData) {
        try {
            console.log(`Восстановление члена команды: ${memberData.name} (${memberData.id})`);
            
            // Преобразуем данные из бэкапа в формат создания
            const createData: CreateTeamMemberRequest = {
                name: memberData.name,
                role: memberData.role,
                bio: memberData.bio,
                avatar: memberData.avatar,
                skills: memberData.skills || []
            };
            
            await createTeamMember(createData);
            restoredCount++;
            console.log(`✅ Успешно восстановлен: ${memberData.name}`);
        } catch (error) {
            console.error(`❌ Ошибка восстановления члена команды ${memberData.id}:`, error);
        }
    }
    
    console.log(`Всего восстановлено: ${restoredCount} из ${teamData.length}`);
    return restoredCount;
}

/**
 * Восстановление навигации из бэкапа
 */
async function restoreNavigation(navData: any[]): Promise<number> {
    let restoredCount = 0;
    
    // Сначала очищаем текущую навигацию
    await clearCurrentData('navigation');
    
    // Затем восстанавливаем из бэкапа
    for (const navItemData of navData) {
        try {
            // Преобразуем данные из бэкапа в формат создания
            const createData: CreateNavigationItemRequest = {
                label: navItemData.label,
                path: navItemData.path,
                icon: navItemData.icon,
                order: navItemData.order,
                isActive: navItemData.isActive !== undefined ? navItemData.isActive : true
            };
            
            await createNavigationItem(createData);
            restoredCount++;
        } catch (error) {
            console.error(`Ошибка восстановления элемента навигации ${navItemData.id}:`, error);
        }
    }
    
    return restoredCount;
}

/**
 * Основная функция восстановления данных из бэкапа
 */
export async function restoreDataFromBackup(backupId: string, restoreDataTypes?: string[]): Promise<RestoreResult> {
    try {
        // Получаем бэкап
        const backup = backupStore.getBackupById(backupId);
        if (!backup) {
            throw new Error('Бэкап не найден');
        }
        
        // Определяем типы данных для восстановления
        const dataTypesToRestore = restoreDataTypes || backup.dataTypes;
        
        // Проверяем допустимые типы
        const validTypes = dataTypesToRestore.filter(type => 
            ['products', 'team', 'navigation'].includes(type)
        );
        
        if (validTypes.length === 0) {
            throw new Error('Нет допустимых типов данных для восстановления');
        }
        
        const result: RestoreResult = {
            success: true,
            restoredItems: {},
            errors: [],
            message: ''
        };
        
        // Восстанавливаем каждый тип данных
        for (const dataType of validTypes) {
            try {
                let restoredCount = 0;
                
                switch (dataType) {
                    case 'products':
                        restoredCount = await restoreProducts(backup.data.products || []);
                        result.restoredItems.products = restoredCount;
                        break;
                        
                    case 'team':
                        restoredCount = await restoreTeamMembers(backup.data.team || []);
                        result.restoredItems.team = restoredCount;
                        break;
                        
                    case 'navigation':
                        restoredCount = await restoreNavigation(backup.data.navigation || []);
                        result.restoredItems.navigation = restoredCount;
                        break;
                }
                
                console.log(`✅ Восстановлено ${restoredCount} элементов типа ${dataType}`);
                
            } catch (error: any) {
                const errorMsg = `Ошибка восстановления ${dataType}: ${error.message}`;
                result.errors.push(errorMsg);
                console.error(errorMsg);
            }
        }
        
        // Формируем сообщение о результате
        const totalRestored = Object.values(result.restoredItems).reduce((sum, count) => sum + (count || 0), 0);
        
        if (result.errors.length > 0) {
            result.success = false;
            result.message = `Частично восстановлено ${totalRestored} элементов. Ошибки: ${result.errors.join('; ')}`;
        } else {
            result.message = `Успешно восстановлено ${totalRestored} элементов`;
        }
        
        return result;
        
    } catch (error: any) {
        return {
            success: false,
            restoredItems: {},
            errors: [error.message],
            message: `Ошибка восстановления: ${error.message}`
        };
    }
}

/**
 * Предварительный просмотр данных в бэкапе
 */
export async function previewBackupData(backupId: string): Promise<any> {
    const backup = backupStore.getBackupById(backupId);
    if (!backup) {
        throw new Error('Бэкап не найден');
    }
    
    return {
        id: backup.id,
        description: backup.description,
        createdAt: backup.createdAt,
        dataTypes: backup.dataTypes,
        dataPreview: {
            products: backup.data.products?.length || 0,
            team: backup.data.team?.length || 0,
            navigation: backup.data.navigation?.length || 0
        }
    };
}

/**
 * Проверка совместимости данных перед восстановлением
 */
export async function checkRestoreCompatibility(backupId: string): Promise<{
    compatible: boolean;
    warnings: string[];
    errors: string[];
}> {
    const backup = backupStore.getBackupById(backupId);
    if (!backup) {
        return {
            compatible: false,
            warnings: [],
            errors: ['Бэкап не найден']
        };
    }
    
    const result = {
        compatible: true,
        warnings: [] as string[],
        errors: [] as string[]
    };
    
    // Проверяем наличие данных для каждого типа
    if (backup.dataTypes.includes('products') && (!backup.data.products || backup.data.products.length === 0)) {
        result.warnings.push('В бэкапе отсутствуют данные о продуктах');
    }
    
    if (backup.dataTypes.includes('team') && (!backup.data.team || backup.data.team.length === 0)) {
        result.warnings.push('В бэкапе отсутствуют данные о членах команды');
    }
    
    if (backup.dataTypes.includes('navigation') && (!backup.data.navigation || backup.data.navigation.length === 0)) {
        result.warnings.push('В бэкапе отсутствуют данные о навигации');
    }
    
    return result;
}