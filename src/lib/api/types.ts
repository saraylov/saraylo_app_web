import type { RequestHandler as SvelteRequestHandler } from '@sveltejs/kit';

// Базовые типы API
export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
	details?: any;
	timestamp: string;
}

// Типы для аутентификации
export interface AuthTokenPayload {
	userId: string;
	email: string;
	role: 'admin' | 'editor' | 'viewer';
	iat: number;
	exp: number;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	user: {
		id: string;
		email: string;
		role: string;
		name: string;
	};
	expiresIn: number;
}

// Расширенные типы для продуктов
export interface ApiProduct {
	id: string;
	name: string;
	description: string;
	type: 'desktop' | 'mobile';
	icon: string;
	images: string[];
	features: string[];
	technologies: string[];
	link?: string;
	releaseDate: string; // ISO string format
	createdAt: string;
	updatedAt: string;
}

// Типы для команды
export interface ApiTeamMember {
	id: string;
	name: string;
	role: string;
	bio: string;
	skills: string[];
	avatar?: string;
	createdAt: string;
	updatedAt: string;
}

// Типы для навигации
export interface ApiNavigationItem {
	id: string;
	label: string;
	path: string;
	icon?: string;
	order: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

// Интерфейсы для запросов
export interface CreateProductRequest {
	name: string;
	description: string;
	type: 'desktop' | 'mobile';
	icon: string;
	images: string[];
	features: string[];
	technologies: string[];
	link?: string;
	releaseDate: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

export interface CreateTeamMemberRequest {
	name: string;
	role: string;
	bio: string;
	skills: string[];
	avatar?: string;
}

export interface UpdateTeamMemberRequest extends Partial<CreateTeamMemberRequest> {}

export interface CreateNavigationItemRequest {
	label: string;
	path: string;
	icon?: string;
	order: number;
	isActive: boolean;
}

export interface UpdateNavigationItemRequest extends Partial<CreateNavigationItemRequest> {}

// Пагинация
export interface PaginationParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}

// Поиск и фильтрация
export interface SearchParams extends PaginationParams {
	search?: string;
	filter?: Record<string, any>;
}



// Конфигурация API
export interface ApiConfig {
	apiVersion: string;
	basePath: string;
	maxFileSize: number;
	allowedFileTypes: string[];
	rateLimits: {
		global: number;
		perEndpoint: Record<string, number>;
	};
}