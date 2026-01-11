/**
 * Отладочный скрипт для проверки формата API ответов
 */

async function debugApiFormat() {
    const baseUrl = 'http://localhost:5173';
    
    try {
        console.log('=== Отладка формата API ===\n');
        
        // Аутентификация
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
        const token = loginData.data.token;
        console.log('✅ Токен получен\n');
        
        // Проверка формата ответа команды
        console.log('2. Проверка формата ответа команды...');
        const teamResponse = await fetch(`${baseUrl}/api/v1/team-members`);
        const teamData = await teamResponse.json();
        
        console.log('Team API response structure:');
        console.log(JSON.stringify(teamData, null, 2));
        console.log('');
        
        // Проверка формата ответа продуктов
        console.log('3. Проверка формата ответа продуктов...');
        const productsResponse = await fetch(`${baseUrl}/api/v1/products`);
        const productsData = await productsResponse.json();
        
        console.log('Products API response structure:');
        console.log(JSON.stringify(productsData, null, 2));
        console.log('');
        
        // Проверка формата ответа навигации
        console.log('4. Проверка формата ответа навигации...');
        const navResponse = await fetch(`${baseUrl}/api/v1/navigation`);
        const navData = await navResponse.json();
        
        console.log('Navigation API response structure:');
        console.log(JSON.stringify(navData, null, 2));
        console.log('');
        
    } catch (error) {
        console.error('❌ Ошибка отладки:', error);
    }
}

debugApiFormat();