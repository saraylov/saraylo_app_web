# Быстрый старт с API

## Начало работы

### 1. Запуск сервера разработки
```bash
npm run dev
```

### 2. Аутентификация
Используйте тестовые учетные данные:

**Администратор:**
- Email: admin@example.com
- Пароль: admin123

**Редактор:**
- Email: editor@example.com  
- Пароль: editor123

### 3. Получение токена
```bash
curl -X POST http://localhost:5173/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### 4. Использование API
Добавьте заголовок Authorization к каждому защищенному запросу:
```
Authorization: Bearer ваш_токен_здесь
```

## Примеры запросов

### Получение списка продуктов
```bash
# Без аутентификации
curl "http://localhost:5173/api/v1/products?page=1&limit=5"

# С поиском
curl "http://localhost:5173/api/v1/products?search=TaskFlow"
```

### Создание продукта
```bash
curl -X POST http://localhost:5173/api/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ваш_токен" \
  -d '{
    "name": "Новое приложение",
    "description": "Описание нового приложения",
    "type": "mobile",
    "icon": "📱",
    "images": ["/images/app1.jpg"],
    "features": ["Функция 1", "Функция 2"],
    "technologies": ["React Native", "Firebase"],
    "link": "https://app.example.com",
    "releaseDate": "2024-12-01T00:00:00.000Z"
  }'
```

### Обновление продукта
```bash
curl -X PUT http://localhost:5173/api/v1/products/taskflow-pro \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ваш_токен" \
  -d '{
    "name": "TaskFlow Pro Updated",
    "description": "Обновленное описание"
  }'
```

### Удаление продукта
```bash
curl -X DELETE http://localhost:5173/api/v1/products/taskflow-pro \
  -H "Authorization: Bearer ваш_токен"
```

## Структура проекта

```
src/
├── lib/
│   ├── api/
│   │   ├── auth.ts              # Аутентификация
│   │   ├── utils.ts             # Утилиты API
│   │   ├── types.ts             # Типы TypeScript
│   │   └── services/
│   │       ├── productService.ts    # Сервис продуктов
│   │       ├── teamService.ts       # Сервис команды
│   │       └── navigationService.ts # Сервис навигации
│   └── data/
│       └── products.ts          # Исходные данные продуктов
└── routes/
    └── api/
        └── v1/
            ├── auth/
            │   └── login/
            │       └── +server.ts   # Endpoint логина
            ├── products/
            │   ├── +server.ts       # GET список продуктов
            │   └── [id]/
            │       ├── +server.ts   # GET/PUT конкретного продукта
            │       └── delete/
            │           └── +server.ts # DELETE продукта
            ├── team-members/
            │   ├── +server.ts       # GET список команды
            │   └── [id]/
            │       └── +server.ts   # GET конкретного члена
            └── navigation/
                └── +server.ts       # GET навигации
```

## Интеграция с мобильными приложениями

### React Native пример:
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiService {
  static BASE_URL = 'http://ваш-сайт.ru/api/v1';
  
  static async login(email, password) {
    const response = await fetch(`${this.BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (data.success) {
      await AsyncStorage.setItem('authToken', data.data.token);
    }
    return data;
  }
  
  static async getProducts(page = 1) {
    const response = await fetch(`${this.BASE_URL}/products?page=${page}`);
    return await response.json();
  }
  
  static async createProduct(productData) {
    const token = await AsyncStorage.getItem('authToken');
    const response = await fetch(`${this.BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    return await response.json();
  }
}
```

## Разворачивание в production

1. **Настройка переменных окружения:**
```bash
# .env.production
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRES_IN=24h
```

2. **Заменить моковые данные на реальную БД:**
- PostgreSQL/MongoDB для хранения данных
- Redis для кэширования
- Реальная система пользователей

3. **Настройка безопасности:**
- HTTPS сертификат
- Rate limiting
- CORS настройки
- Логирование

4. **Деплой:**
```bash
npm run build
# Загрузить build директорию на сервер
```

## Поддержка

Для вопросов и поддержки обращайтесь к документации API или создавайте issue в репозитории проекта.