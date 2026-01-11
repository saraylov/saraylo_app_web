import { unauthorizedError, forbiddenError } from './utils';
import type { AuthTokenPayload } from './types';

// Секретный ключ для JWT (в production использовать переменные окружения)
const JWT_SECRET = 'your-secret-key-change-in-production';

// Моковые данные пользователей (в production использовать базу данных)
const mockUsers = [
	{
		id: '1',
		email: 'admin@example.com',
		password: 'admin123', // В production хранить хэши паролей
		name: 'Администратор',
		role: 'admin' as const
	},
	{
		id: '2',
		email: 'editor@example.com',
		password: 'editor123',
		name: 'Редактор',
		role: 'editor' as const
	}
];

interface UserCredentials {
	email: string;
	password: string;
}

interface AuthenticatedUser {
	id: string;
	email: string;
	name: string;
	role: 'admin' | 'editor' | 'viewer';
}

// Аутентификация пользователя
export async function authenticateUser(credentials: UserCredentials): Promise<AuthenticatedUser | null> {
	const user = mockUsers.find(u => 
		u.email === credentials.email && u.password === credentials.password
	);
	
	if (!user) {
		return null;
	}
	
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		role: user.role
	};
}

// Генерация простого токена (в production использовать JWT)
export function generateToken(user: AuthenticatedUser): string {
	// Простой токен в формате: userId:timestamp:signature
	const timestamp = Date.now();
	const signature = btoa(`${user.id}:${timestamp}:${JWT_SECRET}`).slice(0, 32);
	return `${user.id}:${timestamp}:${signature}`;
}

// Верификация токена
export function verifyToken(token: string): AuthTokenPayload | null {
	try {
		const parts = token.split(':');
		if (parts.length !== 3) return null;
		
		const [userId, timestampStr, signature] = parts;
		const timestamp = parseInt(timestampStr);
		
		// Проверка времени жизни токена (24 часа)
		if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
			return null;
		}
		
		// Проверка подписи
		const expectedSignature = btoa(`${userId}:${timestamp}:${JWT_SECRET}`).slice(0, 32);
		if (signature !== expectedSignature) {
			return null;
		}
		
		// Получение данных пользователя
		const user = getUserById(userId);
		if (!user) return null;
		
		return {
			userId: user.id,
			email: user.email,
			role: user.role,
			iat: Math.floor(timestamp / 1000),
			exp: Math.floor((timestamp + 24 * 60 * 60 * 1000) / 1000)
		};
	} catch (error) {
		console.error('Token verification failed:', error);
		return null;
	}
}

// Middleware для проверки аутентификации
export function requireAuth(request: Request): AuthTokenPayload | Response {
	const authHeader = request.headers.get('authorization');
	
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return unauthorizedError('Требуется токен авторизации');
	}
	
	const token = authHeader.substring(7);
	const payload = verifyToken(token);
	
	if (!payload) {
		return unauthorizedError('Неверный или просроченный токен');
	}
	
	return payload;
}

// Middleware для проверки прав доступа
export function requireRole(requiredRoles: ('admin' | 'editor' | 'viewer')[]) {
	return function(request: Request): AuthTokenPayload | Response {
		const authResult = requireAuth(request);
		
		if (authResult instanceof Response) {
			return authResult;
		}
		
		const user = authResult;
		
		if (!requiredRoles.includes(user.role)) {
			return forbiddenError(`Требуются права: ${requiredRoles.join(', ')}`);
		}
		
		return user;
	};
}

// Получение пользователя по ID
export function getUserById(id: string): AuthenticatedUser | undefined {
	const user = mockUsers.find(u => u.id === id);
	
	if (!user) {
		return undefined;
	}
	
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		role: user.role
	};
}