/**
 * Проверка структуры бэкапа
 */

async function checkBackupStructure() {
    const baseUrl = 'http://localhost:5173';
    
    try {
        console.log('=== Проверка структуры бэкапа ===\n');
        
        // Аутентификация
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
        const token = loginData.data.token;
        
        // Получение списка бэкапов
        const backupsResponse = await fetch(`${baseUrl}/api/v1/backups`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const backupsData = await backupsResponse.json();
        const backups = backupsData.data.data;
        
        if (backups.length === 0) {
            console.log('Нет доступных бэкапов');
            return;
        }
        
        const latestBackup = backups[0];
        console.log('Последний бэкап:');
        console.log(`ID: ${latestBackup.id}`);
        console.log(`Описание: ${latestBackup.description}`);
        console.log(`Типы данных: ${latestBackup.dataTypes.join(', ')}`);
        console.log('');
        
        // Получение деталей бэкапа
        const backupDetailsResponse = await fetch(`${baseUrl}/api/v1/backups/${latestBackup.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const backupDetailsData = await backupDetailsResponse.json();
        console.log('Структура данных бэкапа:');
        console.log(JSON.stringify(backupDetailsData.data, null, 2));
        
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

checkBackupStructure();