import { generateId, formatDate } from '../utils';
import type { ApiNavigationItem, CreateNavigationItemRequest, UpdateNavigationItemRequest } from '../types';

// Хранилище элементов навигации в памяти (в production использовать базу данных)
let navigationStore: ApiNavigationItem[] = [
	{
		id: 'nav1',
		label: 'Главная',
		path: '/',
		icon: '🏠',
		order: 1,
		isActive: true,
		createdAt: formatDate(new Date('2023-01-01')),
		updatedAt: formatDate(new Date('2023-01-01'))
	},
	{
		id: 'nav2',
		label: 'Продукты',
		path: '/products',
		icon: '📦',
		order: 2,
		isActive: true,
		createdAt: formatDate(new Date('2023-01-01')),
		updatedAt: formatDate(new Date('2023-01-01'))
	},
	{
		id: 'nav3',
		label: 'О нас',
		path: '/about',
		icon: '👥',
		order: 3,
		isActive: true,
		createdAt: formatDate(new Date('2023-01-01')),
		updatedAt: formatDate(new Date('2023-01-01'))
	},
	{
		id: 'nav4',
		label: 'Контакты',
		path: '/contact',
		icon: '📞',
		order: 4,
		isActive: true,
		createdAt: formatDate(new Date('2023-01-01')),
		updatedAt: formatDate(new Date('2023-01-01'))
	}
];

// Получение всех активных элементов навигации, отсортированных по порядку
export async function getActiveNavigationItems(): Promise<ApiNavigationItem[]> {
	return navigationStore
		.filter(item => item.isActive)
		.sort((a, b) => a.order - b.order);
}

// Получение всех элементов навигации
export async function getAllNavigationItems(limit?: number, offset?: number): Promise<ApiNavigationItem[]> {
	let items = [...navigationStore].sort((a, b) => a.order - b.order);
	
	// Пагинация
	if (limit) {
		const startIndex = offset || 0;
		items = items.slice(startIndex, startIndex + limit);
	}
	
	return items;
}

// Получение элемента навигации по ID
export async function getNavigationItemById(id: string): Promise<ApiNavigationItem | null> {
	const item = navigationStore.find(n => n.id === id);
	return item || null;
}

// Создание нового элемента навигации
export async function createNavigationItem(data: CreateNavigationItemRequest): Promise<ApiNavigationItem> {
	const newNavItem: ApiNavigationItem = {
		id: generateId(),
		...data,
		createdAt: formatDate(new Date()),
		updatedAt: formatDate(new Date())
	};
	
	navigationStore.push(newNavItem);
	return newNavItem;
}

// Обновление элемента навигации
export async function updateNavigationItem(id: string, data: UpdateNavigationItemRequest): Promise<ApiNavigationItem | null> {
	const index = navigationStore.findIndex(n => n.id === id);
	
	if (index === -1) {
		return null;
	}
	
	const updatedItem = {
		...navigationStore[index],
		...data,
		updatedAt: formatDate(new Date())
	};
	
	navigationStore[index] = updatedItem;
	return updatedItem;
}

// Удаление элемента навигации
export async function deleteNavigationItem(id: string): Promise<boolean> {
	const index = navigationStore.findIndex(n => n.id === id);
	
	if (index === -1) {
		return false;
	}
	
	navigationStore.splice(index, 1);
	return true;
}

// Получение количества элементов навигации
export async function getNavigationItemCount(): Promise<number> {
	return navigationStore.length;
}

// Получение активных элементов навигации по пути
export async function getNavigationItemsByPath(path: string): Promise<ApiNavigationItem[]> {
	return navigationStore.filter(item => 
		item.path === path && item.isActive
	);
}

// Обновление порядка элементов навигации
export async function reorderNavigationItems(reorderData: { id: string; newOrder: number }[]): Promise<boolean> {
	try {
		for (const { id, newOrder } of reorderData) {
			const item = navigationStore.find(n => n.id === id);
			if (item) {
				item.order = newOrder;
				item.updatedAt = formatDate(new Date());
			}
		}
		return true;
	} catch (error) {
		console.error('Failed to reorder navigation items:', error);
		return false;
	}
}