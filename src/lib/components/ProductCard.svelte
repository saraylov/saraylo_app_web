<script lang="ts">
	import { base } from '$app/paths';
	import type { Product } from '$lib/types';
	import { t } from '$lib/i18n';
	export let product: Product;
	
	let isHovered = false;
</script>

<article 
	class="product-card"
	on:mouseenter={() => isHovered = true}
	on:mouseleave={() => isHovered = false}
>
	<div class="card-header">
		<div class="product-icon">
			{product.icon}
		</div>
		<span class="product-type" class:desktop={product.type === 'desktop'} class:mobile={product.type === 'mobile'}>
			{product.type === 'desktop' ? t('components.product_type_desktop') : t('components.product_type_mobile')}
		</span>
	</div>
	
	<div class="card-content">
		<h3 class="product-name">{product.name}</h3>
		<p class="product-description">{product.description}</p>
		
		<div class="features-preview">
			{#each product.features.slice(0, 3) as feature}
				<span class="feature-tag">{feature}</span>
			{/each}
			{#if product.features.length > 3}
				<span class="more-features">+{product.features.length - 3} more</span>
			{/if}
		</div>
	</div>
	
	<div class="card-footer">
		<div class="tech-stack">
			{#each product.technologies.slice(0, 3) as tech}
				<span class="tech-item">{tech}</span>
			{/each}
		</div>
		
		<a href={`${base}/products/${product.id}`} class="view-details-link">
			{t('components.view_details')}
		</a>
	</div>
	
	<div class="hover-effect" class:active={isHovered}></div>
</article>

<style>
	.product-card {
		position: relative;
		background: white;
		border-radius: 20px;
		padding: var(--spacing-xl);
		box-shadow: var(--shadow-soft);
		border: 1px solid var(--color-gray-100);
		transition: all var(--transition-normal);
		overflow: hidden;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.product-card:hover {
		transform: translateY(-8px);
		box-shadow: var(--shadow-md);
		border-color: var(--color-lime);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--spacing-lg);
	}

	.product-icon {
		font-size: 2.5rem;
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-gray-200) 100%);
		border-radius: 16px;
		transition: all var(--transition-fast);
	}

	.product-card:hover .product-icon {
		transform: scale(1.1) rotate(5deg);
		background: linear-gradient(135deg, var(--color-lime) 0%, var(--color-peach) 100%);
		box-shadow: var(--glow-lime);
	}

	.product-type {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 600;
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: 20px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.product-type.desktop {
		background: rgba(163, 230, 53, 0.1);
		color: var(--color-lime);
		border: 1px solid rgba(163, 230, 53, 0.2);
	}

	.product-type.mobile {
		background: rgba(249, 115, 22, 0.1);
		color: var(--color-peach);
		border: 1px solid rgba(249, 115, 22, 0.2);
	}

	.card-content {
		flex-grow: 1;
		margin-bottom: var(--spacing-lg);
	}

	.product-name {
		font-size: var(--text-xl);
		font-weight: 700;
		margin-bottom: var(--spacing-sm);
		color: var(--color-gray-900);
		transition: color var(--transition-fast);
	}

	.product-card:hover .product-name {
		color: var(--color-lime);
	}

	.product-description {
		color: var(--color-warm-text-light);
		line-height: 1.6;
		margin-bottom: var(--spacing-md);
	}

	.features-preview {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
	}

	.feature-tag {
		font-size: var(--text-xs);
		background: var(--color-warm-neutral);
		color: var(--color-warm-text);
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: 12px;
		font-family: var(--font-mono);
	}

	.more-features {
		font-size: var(--text-xs);
		color: var(--color-warm-text-lighter);
		font-style: italic;
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.tech-stack {
		display: flex;
		gap: var(--spacing-xs);
		flex-wrap: wrap;
	}

	.tech-item {
		font-size: var(--text-xs);
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: 20px;
		border: 1px solid var(--glass-border);
		color: var(--color-warm-text-light);
		font-family: var(--font-mono);
	}

	.view-details-link {
		font-family: var(--font-mono);
		font-weight: 600;
		color: var(--color-lime);
		font-size: var(--text-sm);
		text-decoration: none;
		transition: all var(--transition-fast);
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.view-details-link:hover {
		color: var(--color-fuchsia);
		transform: translateX(4px);
	}

	.hover-effect {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, 
			rgba(163, 230, 53, 0.05) 0%, 
			rgba(232, 121, 249, 0.05) 100%);
		opacity: 0;
		transition: opacity var(--transition-normal);
		border-radius: 20px;
		pointer-events: none;
	}

	.hover-effect.active {
		opacity: 1;
	}

	@media (max-width: 768px) {
		.product-card {
			padding: var(--spacing-lg);
		}
		
		.card-footer {
			flex-direction: column;
			align-items: flex-start;
		}
		
		.view-details-link {
			align-self: flex-end;
		}
	}
</style>