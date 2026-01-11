import { products as initialProducts } from '$lib/data/products';
import type { Product } from '$lib/types';
import { generateId, formatDate } from '../utils';
import type { ApiProduct, CreateProductRequest, UpdateProductRequest } from '../types';

// Хранилище продуктов в памяти (в production использовать базу данных)
let productsStore: ApiProduct[] = initialProducts.map(product => ({
	...product,
	releaseDate: formatDate(product.releaseDate),
	createdAt: formatDate(new Date()),
	updatedAt: formatDate(new Date())
}));

// Преобразование продукта из внутреннего формата в API формат
function convertToApiProduct(product: Product): ApiProduct {
	return {
		...product,
		releaseDate: formatDate(product.releaseDate),
		createdAt: formatDate(new Date()),
		updatedAt: formatDate(new Date())
	};
}

// Получение всех продуктов
export async function getAllProducts(search?: string, limit?: number, offset?: number): Promise<ApiProduct[]> {
	let filteredProducts = [...productsStore];
	
	// Поиск по имени и описанию
	if (search) {
		const searchTerm = search.toLowerCase();
		filteredProducts = filteredProducts.filter(product => 
			product.name.toLowerCase().includes(searchTerm) ||
			product.description.toLowerCase().includes(searchTerm) ||
			product.features.some(feature => feature.toLowerCase().includes(searchTerm))
		);
	}
	
	// Пагинация
	if (limit) {
		const startIndex = offset || 0;
		filteredProducts = filteredProducts.slice(startIndex, startIndex + limit);
	}
	
	return filteredProducts;
}

// Получение продукта по ID
export async function getProductById(id: string): Promise<ApiProduct | null> {
	const product = productsStore.find(p => p.id === id);
	return product || null;
}

// Создание нового продукта
export async function createProduct(data: CreateProductRequest): Promise<ApiProduct> {
	const newProduct: ApiProduct = {
		id: generateId(),
		...data,
		releaseDate: data.releaseDate,
		createdAt: formatDate(new Date()),
		updatedAt: formatDate(new Date())
	};
	
	productsStore.push(newProduct);
	return newProduct;
}

// Обновление продукта
export async function updateProduct(id: string, data: UpdateProductRequest): Promise<ApiProduct | null> {
	const index = productsStore.findIndex(p => p.id === id);
	
	if (index === -1) {
		return null;
	}
	
	const updatedProduct = {
		...productsStore[index],
		...data,
		updatedAt: formatDate(new Date())
	};
	
	productsStore[index] = updatedProduct;
	return updatedProduct;
}

// Удаление продукта
export async function deleteProduct(id: string): Promise<boolean> {
	const index = productsStore.findIndex(p => p.id === id);
	
	if (index === -1) {
		return false;
	}
	
	productsStore.splice(index, 1);
	return true;
}

// Получение количества продуктов
export async function getProductCount(): Promise<number> {
	return productsStore.length;
}

// Получение продуктов по типу
export async function getProductsByType(type: 'desktop' | 'mobile'): Promise<ApiProduct[]> {
	return productsStore.filter(p => p.type === type);
}