async function simpleTest() {
    const baseUrl = 'http://localhost:5179';
    
    try {
        // Аутентификация
        console.log('1. Аутентификация...');
        const loginRes = await fetch(`${baseUrl}/api/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@example.com', password: 'admin123' })
        });
        
        const loginData = await loginRes.json();
        const token = loginData.data.token;
        console.log('✅ Токен получен\n');
        
        // Создание продукта
        console.log('2. Создание тестового продукта...');
        const createRes = await fetch(`${baseUrl}/api/v1/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: 'Test Product',
                description: 'Test Description',
                type: 'desktop',
                icon: '📦',
                images: [],
                features: ['Feature 1'],
                technologies: ['Tech 1'],
                releaseDate: '2024-01-01'
            })
        });
        
        const createData = await createRes.json();
        console.log('Результат создания:', createData);
        
        if (createData.success) {
            console.log('✅ Продукт создан\n');
            
            // Проверка списка продуктов
            console.log('3. Проверка списка продуктов...');
            const productsRes = await fetch(`${baseUrl}/api/v1/products`);
            const productsData = await productsRes.json();
            console.log(`Количество продуктов: ${productsData.data?.length || 0}\n`);
            
            // Удаление тестового продукта
            console.log('4. Удаление тестового продукта...');
            const deleteRes = await fetch(`${baseUrl}/api/v1/products/${createData.data.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            const deleteData = await deleteRes.json();
            console.log('Результат удаления:', deleteData.success ? '✅ Успешно' : '❌ Ошибка');
            
        } else {
            console.log('❌ Ошибка создания продукта');
        }
        
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

simpleTest();