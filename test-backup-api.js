/**
 * Тестовый скрипт для проверки работы API бэкапов
 */

// Функция для тестирования API
async function testBackupAPI() {
    const baseUrl = 'http://localhost:5178';
    
    try {
        console.log('=== Тестирование API бэкапов ===\n');
        
        // 1. Аутентификация
        console.log('1. Аутентификация...');
        const loginResponse = await fetch(`${baseUrl}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'admin@example.com',
                password: 'admin123'
            })
        });
        
        const loginData = await loginResponse.json();
        console.log('Login response:', loginData);
        
        if (!loginData.success) {
            console.error('❌ Аутентификация не удалась');
            return;
        }
        
        const token = loginData.data.token;
        console.log('✅ Аутентификация успешна\n');
        
        // 2. Получение списка бэкапов
        console.log('2. Получение списка бэкапов...');
        const backupsResponse = await fetch(`${baseUrl}/api/v1/backups`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const backupsData = await backupsResponse.json();
        console.log('Backups response:', backupsData);
        
        if (!backupsData.success) {
            console.error('❌ Не удалось получить список бэкапов');
            return;
        }
        
        const backups = backupsData.data.data;
        console.log(`✅ Получено ${backups.length} бэкапов\n`);
        
        // 3. Создание нового бэкапа
        console.log('3. Создание нового бэкапа...');
        const createBackupResponse = await fetch(`${baseUrl}/api/v1/backups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                description: 'Тестовый бэкап',
                dataTypes: ['products', 'team']
            })
        });
        
        const createBackupData = await createBackupResponse.json();
        console.log('Create backup response:', createBackupData);
        
        if (!createBackupData.success) {
            console.error('❌ Не удалось создать бэкап');
            return;
        }
        
        const newBackupId = createBackupData.data.id;
        console.log(`✅ Бэкап создан с ID: ${newBackupId}\n`);
        
        // 4. Восстановление из бэкапа
        console.log('4. Восстановление из бэкапа...');
        const restoreResponse = await fetch(`${baseUrl}/api/v1/backups/${newBackupId}/restore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                restoreDataTypes: ['products']
            })
        });
        
        const restoreData = await restoreResponse.json();
        console.log('Restore response:', restoreData);
        
        if (!restoreData.success) {
            console.error('❌ Не удалось восстановить из бэкапа');
            return;
        }
        
        console.log('✅ Восстановление успешно\n');
        
        // 5. Удаление бэкапа
        console.log('5. Удаление бэкапа...');
        const deleteResponse = await fetch(`${baseUrl}/api/v1/backups/${newBackupId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const deleteData = await deleteResponse.json();
        console.log('Delete response:', deleteData);
        
        if (!deleteData.success) {
            console.error('❌ Не удалось удалить бэкап');
            return;
        }
        
        console.log('✅ Бэкап успешно удален\n');
        
        console.log('🎉 Все тесты API бэкапов пройдены успешно!');
        
    } catch (error) {
        console.error('❌ Ошибка при тестировании API:', error);
    }
}

// Запуск тестов
testBackupAPI();