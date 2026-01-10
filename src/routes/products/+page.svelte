<script lang="ts">
	import { onMount } from 'svelte';
	import { products } from '$lib/data/products';
	import type { Product } from '$lib/types';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { t } from '$lib/i18n';
	
	let filteredProducts: Product[] = [];
	let selectedFilter: 'all' | 'desktop' | 'mobile' = 'all';
	let isVisible = false;
	
	const filters = [
		{ id: 'all', label: t('products.all') },
		{ id: 'desktop', label: t('products.desktop') },
		{ id: 'mobile', label: t('products.mobile') }
	];
	
	onMount(() => {
		filterProducts();
		setTimeout(() => {
			isVisible = true;
		}, 100);
	});
	
	function filterProducts() {
		if (selectedFilter === 'all') {
			filteredProducts = [...products];
		} else {
			filteredProducts = products.filter(product => product.type === selectedFilter);
		}
	}
	
	function handleFilterChange(filter: string) {
		selectedFilter = filter as 'all' | 'desktop' | 'mobile';
		filterProducts();
	}
</script>

<div class="products-page">
	<section class="hero-section">
		<div class="container">
			<div class="hero-content" class:visible={isVisible}>
				<h1 class="page-title">{t('products.title')}</h1>
				<p class="page-subtitle">
					{t('products.subtitle')}
				</p>
			</div>
		</div>
	</section>

	<section class="filters-section">
		<div class="container">
			<div class="filters-container" class:visible={isVisible}>
				<div class="filter-tabs">
					{#each filters as filter}
						<button 
							class="filter-tab" 
							class:active={selectedFilter === filter.id}
							on:click={() => handleFilterChange(filter.id)}
						>
							{filter.label}
							{#if selectedFilter === filter.id}
								<div class="tab-indicator"></div>
							{/if}
						</button>
					{/each}
				</div>
				
				<div class="results-count">
					{filteredProducts.length} {t('products.found')}
				</div>
			</div>
		</div>
	</section>

	<section class="products-grid-section">
		<div class="container">
			{#if filteredProducts.length > 0}
				<div class="products-grid">
					{#each filteredProducts as product, i}
						<div 
							class="product-card-wrapper"
							style="animation-delay: {i * 0.1}s"
							class:visible={isVisible}
						>
							<ProductCard {product} />
						</div>
					{/each}
				</div>
			{:else}
				<div class="empty-state">
					<div class="empty-icon">🔍</div>
					<h3>No applications found</h3>
					<p>Try selecting a different filter to see more applications.</p>
				</div>
			{/if}
		</div>
	</section>
</div>

<style>
	.products-page {
		animation: fadeIn 0.8s ease-out;
	}

	.hero-section {
		padding: var(--spacing-3xl) 0 var(--spacing-xl);
	}

	.hero-content {
		text-align: center;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
	}

	.hero-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.page-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		margin-bottom: var(--spacing-lg);
		font-weight: 800;
	}

	

	.page-subtitle {
		font-size: var(--text-xl);
		color: var(--color-warm-text-light);
		max-width: 700px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.filters-section {
		padding: var(--spacing-xl) 0;
	}

	.filters-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--spacing-md);
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s ease 0.2s;
	}

	.filters-container.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.filter-tabs {
		display: flex;
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		padding: var(--spacing-xs);
		border: 1px solid var(--glass-border);
	}

	.filter-tab {
		position: relative;
		padding: var(--spacing-sm) var(--spacing-lg);
		border-radius: 12px;
		font-family: var(--font-mono);
		font-weight: 500;
		font-size: var(--text-sm);
		color: var(--color-gray-600);
		transition: all var(--transition-fast);
		cursor: pointer;
		background: transparent;
		border: none;
	}

	.filter-tab:hover {
		color: var(--color-gray-900);
	}

	.filter-tab.active {
		color: var(--color-gray-900);
		background: white;
		box-shadow: var(--shadow-soft);
	}

	.tab-indicator {
		position: absolute;
		bottom: -1px;
		left: 50%;
		transform: translateX(-50%);
		width: 8px;
		height: 3px;
		background: var(--color-lime);
		border-radius: 2px;
	}

	.results-count {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-warm-text-lighter);
	}

	.products-grid-section {
		padding: var(--spacing-xl) 0 var(--spacing-3xl);
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: var(--spacing-xl);
	}

	.product-card-wrapper {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
	}

	.product-card-wrapper.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.empty-state {
		text-align: center;
		padding: var(--spacing-3xl) var(--spacing-xl);
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border-radius: 24px;
		border: 1px solid var(--glass-border);
		color: var(--color-warm-text-light);
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: var(--spacing-lg);
		opacity: 0.7;
	}

	.empty-state h3 {
		font-size: var(--text-2xl);
		margin-bottom: var(--spacing-sm);
		color: var(--color-gray-800);
	}

	.empty-state p {
		color: var(--color-warm-text-lighter);
		max-width: 400px;
		margin: 0 auto;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 768px) {
		.filters-container {
			flex-direction: column;
			align-items: stretch;
		}
		
		.filter-tabs {
			justify-content: center;
		}
		
		.products-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-lg);
		}
		
		.results-count {
			text-align: center;
		}
	}

	@media (max-width: 480px) {
		.filter-tab {
			padding: var(--spacing-xs) var(--spacing-md);
			font-size: var(--text-xs);
		}
	}
</style>