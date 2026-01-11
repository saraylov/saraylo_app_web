<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { products } from '$lib/data/products';
	import type { Product } from '$lib/types';
	import { t } from '$lib/i18n';
	
	export let data: { product: Product };
	
	let currentImageIndex = 0;
	let isVisible = false;
	
	onMount(() => {
		setTimeout(() => {
			isVisible = true;
		}, 100);
	});
	
	function nextImage() {
		currentImageIndex = (currentImageIndex + 1) % data.product.images.length;
	}
	
	function prevImage() {
		currentImageIndex = (currentImageIndex - 1 + data.product.images.length) % data.product.images.length;
	}
</script>

<div class="product-detail-page">
	<section class="hero-section">
		<div class="container">
			<div class="product-header" class:visible={isVisible}>
				<div class="header-content">
					<div class="product-meta">
						<div class="product-icon-large">
							{data.product.icon}
						</div>
						<span class="product-type" class:desktop={data.product.type === 'desktop'} class:mobile={data.product.type === 'mobile'}>
							{data.product.type}
						</span>
					</div>
					
					<div class="header-text">
						<h1 class="product-title">{data.product.name}</h1>
						<p class="product-tagline">{data.product.description}</p>
						
						<div class="release-info">
							Released: {data.product.releaseDate.toLocaleDateString('en-US', { 
								year: 'numeric', 
								month: 'long', 
								day: 'numeric' 
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="gallery-section">
		<div class="container">
			<div class="image-gallery" class:visible={isVisible}>
				<div class="main-image-container">
					<img 
						src={data.product.images[currentImageIndex]} 
						alt="{data.product.name} screenshot"
						class="main-image"
						on:error={(e) => (e.target as HTMLImageElement).src = '/images/placeholder.jpg'}
					/>
					
					{#if data.product.images.length > 1}
						<button class="nav-button prev" on:click={prevImage}>←</button>
						<button class="nav-button next" on:click={nextImage}>→</button>
					{/if}
				</div>
				
				{#if data.product.images.length > 1}
					<div class="thumbnails">
						{#each data.product.images as image, index}
							<button 
								class="thumbnail" 
								class:active={index === currentImageIndex}
								on:click={() => currentImageIndex = index}
							>
								<img 
									src={image} 
									alt="Thumbnail {index + 1}"
									on:error={(e) => (e.target as HTMLImageElement).src = '/images/placeholder-thumb.jpg'}
								/>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</section>

	<section class="details-section">
		<div class="container">
			<div class="details-grid" class:visible={isVisible}>
				<div class="features-section">
					<h2 class="section-title">Key Features</h2>
					<ul class="features-list">
						{#each data.product.features as feature}
							<li class="feature-item">
								<span class="feature-icon">✓</span>
								<span class="feature-text">{feature}</span>
							</li>
						{/each}
					</ul>
				</div>
				
				<div class="tech-section">
					<h2 class="section-title">Technology Stack</h2>
					<div class="tech-tags">
						{#each data.product.technologies as tech}
							<span class="tech-tag">{tech}</span>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="cta-section">
		<div class="container">
			<div class="cta-content" class:visible={isVisible}>
				<h2>{t('common.ready_get_started')}</h2>
				<p>{t('common.download_cta').replace('{name}', data.product.name)}</p>
				<div class="cta-buttons">
					<button class="btn btn-primary">{t('common.download_now')}</button>
					<a href={`${base}/products`} class="btn btn-secondary">{t('common.view_other_apps')}</a>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.product-detail-page {
		animation: fadeIn 0.8s ease-out;
	}

	.hero-section {
		padding: var(--spacing-3xl) 0 var(--spacing-xl);
	}

	.product-header {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
	}

	.product-header.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.header-content {
		display: flex;
		gap: var(--spacing-2xl);
		align-items: flex-start;
	}

	.product-meta {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
	}

	.product-icon-large {
		font-size: 4rem;
		width: 100px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-gray-200) 100%);
		border-radius: 24px;
	}

	.header-text {
		flex: 1;
	}

	.product-title {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 800;
		margin-bottom: var(--spacing-md);
		color: var(--color-gray-900);
	}

	.product-tagline {
		font-size: var(--text-xl);
		color: var(--color-warm-text-light);
		line-height: 1.6;
		margin-bottom: var(--spacing-lg);
		max-width: 600px;
	}

	.release-info {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-gray-500);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		border: 1px solid var(--glass-border);
		display: inline-block;
	}

	.gallery-section {
		padding: var(--spacing-xl) 0;
	}

	.image-gallery {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.1s;
	}

	.image-gallery.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.main-image-container {
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: var(--shadow-md);
		margin-bottom: var(--spacing-lg);
		background: var(--color-gray-100);
	}

	.main-image {
		width: 100%;
		height: auto;
		display: block;
		aspect-ratio: 16/9;
		object-fit: cover;
	}

	.nav-button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(0, 0, 0, 0.7);
		color: white;
		border: none;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		font-size: var(--text-lg);
		font-weight: bold;
		cursor: pointer;
		transition: all var(--transition-fast);
		backdrop-filter: blur(10px);
	}

	.nav-button:hover {
		background: rgba(0, 0, 0, 0.9);
		transform: translateY(-50%) scale(1.1);
	}

	.nav-button.prev {
		left: var(--spacing-lg);
	}

	.nav-button.next {
		right: var(--spacing-lg);
	}

	.thumbnails {
		display: flex;
		gap: var(--spacing-sm);
		justify-content: center;
	}

	.thumbnail {
		width: 80px;
		height: 60px;
		border-radius: 8px;
		overflow: hidden;
		border: 2px solid transparent;
		transition: all var(--transition-fast);
		cursor: pointer;
		background: var(--color-gray-100);
	}

	.thumbnail.active {
		border-color: var(--color-lime);
		box-shadow: var(--glow-lime);
	}

	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.details-section {
		padding: var(--spacing-xl) 0 var(--spacing-3xl);
		background: var(--color-warm-bg-alt);
	}

	.details-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-3xl);
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.2s;
	}

	.details-grid.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.section-title {
		font-size: var(--text-2xl);
		font-weight: 700;
		margin-bottom: var(--spacing-lg);
		color: var(--color-warm-text);
	}

	.features-list {
		list-style: none;
	}

	.feature-item {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-md);
		padding: var(--spacing-md);
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		border: 1px solid var(--glass-border);
		transition: all var(--transition-fast);
	}

	.feature-item:hover {
		transform: translateX(4px);
		border-color: var(--color-lime);
	}

	.feature-icon {
		color: var(--color-lime);
		font-weight: bold;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.tech-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.tech-tag {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		background: linear-gradient(135deg, var(--color-warm-neutral) 0%, var(--color-warm-bg-alt) 100%);
		color: var(--color-warm-text);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: 20px;
		transition: all var(--transition-fast);
	}

	.tech-tag:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-soft);
	}

	.cta-section {
		padding: var(--spacing-3xl) 0;
		background: linear-gradient(135deg, var(--color-warm-neutral) 0%, var(--color-warm-bg) 100%);
	}

	.cta-content {
		text-align: center;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.3s;
	}

	.cta-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.cta-content h2 {
		font-size: var(--text-3xl);
		margin-bottom: var(--spacing-md);
		color: var(--color-warm-text);
	}

	.cta-content p {
		font-size: var(--text-xl);
		color: var(--color-warm-text-light);
		margin-bottom: var(--spacing-2xl);
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.cta-buttons {
		display: flex;
		gap: var(--spacing-md);
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		padding: var(--spacing-md) var(--spacing-xl);
		border-radius: 12px;
		font-weight: 600;
		font-family: var(--font-mono);
		transition: all var(--transition-fast);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		font-size: var(--text-sm);
		border: 2px solid transparent;
		cursor: pointer;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--color-lime) 0%, var(--color-peach) 100%);
		color: var(--color-gray-900);
		box-shadow: var(--glow-lime);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: var(--glow-lime), 0 10px 20px rgba(163, 230, 53, 0.3);
	}

	.btn-secondary {
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		color: var(--color-gray-700);
		border-color: var(--glass-border);
	}

	.btn-secondary:hover {
		background: var(--color-gray-100);
		transform: translateY(-2px);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 1024px) {
		.header-content {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
		
		.details-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-xl);
		}
	}

	@media (max-width: 768px) {
		.nav-button {
			width: 40px;
			height: 40px;
			font-size: var(--text-base);
		}
		
		.nav-button.prev {
			left: var(--spacing-md);
		}
		
		.nav-button.next {
			right: var(--spacing-md);
		}
		
		.thumbnail {
			width: 60px;
			height: 45px;
		}
		
		.cta-buttons {
			flex-direction: column;
		}
		
		.btn {
			width: 100%;
		}
	}
</style>