/**
 * Тестирование исправленной системы бэкапов
 * Проверяет корректное сохранение и восстановление реальных данных
 */

async function testFixedBackupSystem() {
    const baseUrl = 'http://localhost:5173';
    
    try {
        console.log('=== Тестирование исправленной системы бэкапов ===\n');
        
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
        if (!loginData.success) {
            console.error('❌ Аутентификация не удалась');
            return;
        }
        
        const token = loginData.data.token;
        console.log('✅ Аутентификация успешна\n');
        
        // 2. Создание нового члена команды (реальные данные)
        console.log('2. Создание нового члена команды...');
        const createMemberResponse = await fetch(`${baseUrl}/api/v1/team-members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: 'Тестовый Член Команды',
                role: 'Тестировщик',
                bio: 'Создан специально для тестирования бэкапов',
                skills: ['JavaScript', 'Testing'],
                avatar: 'test-avatar.jpg'
            })
        });
        
        const createMemberData = await createMemberResponse.json();
        if (!createMemberData.success) {
            console.error('❌ Не удалось создать члена команды');
            return;
        }
        
        const newMemberId = createMemberData.data.id;
        console.log(`✅ Создан член команды с ID: ${newMemberId}\n`);
        
        // 3. Проверка, что член команды действительно создан
        console.log('3. Проверка наличия созданного члена команды...');
        const teamResponse = await fetch(`${baseUrl}/api/v1/team-members`);
        const teamData = await teamResponse.json();
        
        const createdMember = teamData.data.data.find(member => member.id === newMemberId);
        if (!createdMember) {
            console.error('❌ Созданный член команды не найден в списке');
            return;
        }
        
        console.log(`✅ Член команды найден: ${createdMember.name}\n`);
        
        // 4. Создание бэкапа с текущими данными
        console.log('4. Создание бэкапа с текущими данными...');
        const createBackupResponse = await fetch(`${baseUrl}/api/v1/backups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                description: 'Бэкап с новым членом команды',
                dataTypes: ['team']
            })
        });
        
        const createBackupData = await createBackupResponse.json();
        if (!createBackupData.success) {
            console.error('❌ Не удалось создать бэкап');
            return;
        }
        
        const backupId = createBackupData.data.id;
        console.log(`✅ Бэкап создан с ID: ${backupId}\n`);
        
        // 5. Проверка содержимого бэкапа
        console.log('5. Проверка содержимого бэкапа...');
        const backupDetailsResponse = await fetch(`${baseUrl}/api/v1/backups/${backupId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const backupDetailsData = await backupDetailsResponse.json();
        if (!backupDetailsData.success) {
            console.error('❌ Не удалось получить детали бэкапа');
            return;
        }
        
        const backupTeamData = backupDetailsData.data.data.team;
        const backupContainsNewMember = backupTeamData.some(member => member.id === newMemberId);
        
        console.log(`Количество членов команды в бэкапе: ${backupTeamData.length}`);
        console.log(`Новый член команды в бэкапе: ${backupContainsNewMember ? '✅ Да' : '❌ Нет'}\n`);
        
        // 6. Удаление созданного члена команды
        console.log('6. Удаление созданного члена команды...');
        const deleteMemberResponse = await fetch(`${baseUrl}/api/v1/team-members/${newMemberId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const deleteMemberData = await deleteMemberResponse.json();
        if (!deleteMemberData.success) {
            console.error('❌ Не удалось удалить члена команды');
            return;
        }
        
        console.log('✅ Член команды удален\n');
        
        // 7. Проверка, что член команды действительно удален
        console.log('7. Проверка удаления члена команды...');
        const teamResponse2 = await fetch(`${baseUrl}/api/v1/team-members`);
        const teamData2 = await teamResponse2.json();
        
        const memberStillExists = teamData2.data.data.some(member => member.id === newMemberId);
        console.log(`Член команды все еще существует: ${memberStillExists ? '❌ Да' : '✅ Нет'}\n`);
        
        // 8. Восстановление из бэкапа
        console.log('8. Восстановление из бэкапа...');
        const restoreResponse = await fetch(`${baseUrl}/api/v1/backups/${backupId}/restore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                restoreDataTypes: ['team']
            })
        });
        
        const restoreData = await restoreResponse.json();
        console.log('Restore response:', restoreData);
        
        if (!restoreData.success) {
            console.error('❌ Не удалось восстановить из бэкапа');
            return;
        }
        
        console.log('✅ Восстановление успешно выполнено\n');
        
        // 9. Проверка, что член команды восстановлен
        console.log('9. Проверка восстановления члена команды...');
        const teamResponse3 = await fetch(`${baseUrl}/api/v1/team-members`);
        const teamData3 = await teamResponse3.json();
        
        const memberRestored = teamData3.data.data.some(member => 
            member.name === 'Тестовый Член Команды' && 
            member.role === 'Тестировщик'
        );
        console.log(`Член команды восстановлен: ${memberRestored ? '✅ Да' : '❌ Нет'}\n`);
        
        // 10. Финальный результат
        console.log('10. Финальный результат...');
        if (memberRestored) {
            console.log('🎉 ТЕСТ ПРОЙДЕН УСПЕШНО!');
            console.log('✅ Система бэкапов корректно сохраняет и восстанавливает реальные данные');
        } else {
            console.error('❌ ТЕСТ ПРОВАЛЕН');
            console.error('❌ Система бэкапов не восстанавливает реальные данные');
        }
        
    } catch (error) {
        console.error('❌ Ошибка при тестировании:', error);
    }
}

// Запуск теста
testFixedBackupSystem();