import { error } from '@sveltejs/kit';
import { products } from '$lib/data/products';
import type { Product } from '$lib/types';

export async function load({ params }: { params: { id: string } }) {
	const product = products.find(p => p.id === params.id);
	
	if (!product) {
		throw error(404, 'Product not found');
	}
	
	return {
		product
	};
}