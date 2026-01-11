/**
 * Тестирование реального восстановления данных из бэкапов
 * Проверяет корректность восстановления продуктов, команды и навигации
 */

async function testRealDataRestore() {
    const baseUrl = 'http://localhost:5179';
    
    try {
        console.log('=== Тестирование реального восстановления данных ===\n');
        
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
        
        // 2. Получение текущего состояния данных
        console.log('2. Получение текущего состояния данных...');
        
        const [productsRes, teamRes, navRes] = await Promise.all([
            fetch(`${baseUrl}/api/v1/products`),
            fetch(`${baseUrl}/api/v1/team-members`),
            fetch(`${baseUrl}/api/v1/navigation`)
        ]);
        
        const productsData = await productsRes.json();
        const teamData = await teamRes.json();
        const navData = await navRes.json();
        
        const initialState = {
            products: productsData.data?.length || 0,
            team: teamData.data?.length || 0,
            navigation: navData.data?.length || 0
        };
        
        console.log(`Текущее состояние:`);
        console.log(`  - Продуктов: ${initialState.products}`);
        console.log(`  - Членов команды: ${initialState.team}`);
        console.log(`  - Элементов навигации: ${initialState.navigation}\n`);
        
        // 3. Создание бэкапа со всеми данными
        console.log('3. Создание бэкапа со всеми данными...');
        const createBackupResponse = await fetch(`${baseUrl}/api/v1/backups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                description: 'Тестовый бэкап для проверки восстановления',
                dataTypes: ['products', 'team', 'navigation']
            })
        });
        
        const createBackupData = await createBackupResponse.json();
        if (!createBackupData.success) {
            console.error('❌ Не удалось создать бэкап');
            return;
        }
        
        const backupId = createBackupData.data.id;
        console.log(`✅ Бэкап создан с ID: ${backupId}\n`);
        
        // 4. Удаление части данных для тестирования восстановления
        console.log('4. Удаление части данных для тестирования восстановления...');
        
        // Удалим несколько продуктов
        if (productsData.data && productsData.data.length > 0) {
            const productsToDelete = Math.min(2, productsData.data.length);
            for (let i = 0; i < productsToDelete; i++) {
                const productId = productsData.data[i].id;
                await fetch(`${baseUrl}/api/v1/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
            console.log(`  - Удалено ${productsToDelete} продуктов`);
        }
        
        // Удалим одного члена команды
        if (teamData.data && teamData.data.length > 0) {
            const memberId = teamData.data[0].id;
            await fetch(`${baseUrl}/api/v1/team-members/${memberId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('  - Удален 1 член команды');
        }
        
        console.log('✅ Данные удалены для тестирования\n');
        
        // 5. Проверка состояния после удаления
        console.log('5. Проверка состояния после удаления...');
        
        const [productsRes2, teamRes2] = await Promise.all([
            fetch(`${baseUrl}/api/v1/products`),
            fetch(`${baseUrl}/api/v1/team-members`)
        ]);
        
        const productsAfterDelete = await productsRes2.json();
        const teamAfterDelete = await teamRes2.json();
        
        console.log(`Состояние после удаления:`);
        console.log(`  - Продуктов: ${productsAfterDelete.data?.length || 0} (было ${initialState.products})`);
        console.log(`  - Членов команды: ${teamAfterDelete.data?.length || 0} (было ${initialState.team})\n`);
        
        // 6. Реальное восстановление из бэкапа
        console.log('6. Реальное восстановление из бэкапа...');
        const restoreResponse = await fetch(`${baseUrl}/api/v1/backups/${backupId}/restore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                restoreDataTypes: ['products', 'team', 'navigation']
            })
        });
        
        const restoreData = await restoreResponse.json();
        console.log('Restore response:', restoreData);
        
        if (!restoreData.success) {
            console.error('❌ Не удалось восстановить из бэкапа');
            return;
        }
        
        console.log('✅ Восстановление успешно выполнено\n');
        
        // 7. Проверка восстановленных данных
        console.log('7. Проверка восстановленных данных...');
        
        const [finalProductsRes, finalTeamRes, finalNavRes] = await Promise.all([
            fetch(`${baseUrl}/api/v1/products`),
            fetch(`${baseUrl}/api/v1/team-members`),
            fetch(`${baseUrl}/api/v1/navigation`)
        ]);
        
        const finalProducts = await finalProductsRes.json();
        const finalTeam = await finalTeamRes.json();
        const finalNav = await finalNavRes.json();
        
        const finalState = {
            products: finalProducts.data?.length || 0,
            team: finalTeam.data?.length || 0,
            navigation: finalNav.data?.length || 0
        };
        
        console.log(`Финальное состояние:`);
        console.log(`  - Продуктов: ${finalState.products} (ожидалось ${initialState.products})`);
        console.log(`  - Членов команды: ${finalState.team} (ожидалось ${initialState.team})`);
        console.log(`  - Элементов навигации: ${finalState.navigation} (ожидалось ${initialState.navigation})\n`);
        
        // 8. Проверка корректности восстановления
        console.log('8. Проверка корректности восстановления...');
        
        let allCorrect = true;
        let errors = [];
        
        if (finalState.products !== initialState.products) {
            errors.push(`Количество продуктов не совпадает: ${finalState.products} вместо ${initialState.products}`);
            allCorrect = false;
        }
        
        if (finalState.team !== initialState.team) {
            errors.push(`Количество членов команды не совпадает: ${finalState.team} вместо ${initialState.team}`);
            allCorrect = false;
        }
        
        if (finalState.navigation !== initialState.navigation) {
            errors.push(`Количество элементов навигации не совпадает: ${finalState.navigation} вместо ${initialState.navigation}`);
            allCorrect = false;
        }
        
        if (allCorrect) {
            console.log('✅ Все данные успешно восстановлены!');
            console.log(`🎉 Тест реального восстановления пройден успешно!`);
        } else {
            console.error('❌ Ошибки при восстановлении:');
            errors.forEach(error => console.error(`  - ${error}`));
            console.error('\n❌ Тест реального восстановления провален');
        }
        
    } catch (error) {
        console.error('❌ Ошибка при тестировании восстановления:', error);
    }
}

// Запуск теста
testRealDataRestore();