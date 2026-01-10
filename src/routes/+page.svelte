<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';
	import { goto } from '$app/navigation';
	
	let isVisible = false;
	
	onMount(() => {
		// Проверяем, было ли перенаправление с GitHub Pages 404
		const redirectPath = sessionStorage.getItem('github-pages-redirect-path');
		if (redirectPath && redirectPath !== '/' && redirectPath !== '/index.html') {
			// Очищаем sessionStorage
			sessionStorage.removeItem('github-pages-redirect-path');
			// Переходим к запрашиваемому маршруту
			goto(redirectPath);
			return;
		}
		
		// Обычная анимация загрузки
		setTimeout(() => {
			isVisible = true;
		}, 100);
	});
</script>

<div class="home-page">
	<section class="hero-section">
		<div class="hero-content container">
			<div class="brand-intro" class:visible={isVisible}>
				<h1 class="hero-title">
					<span class="highlight-lime">Saraylo</span>
					<br />
					{t('home.title')}
				</h1>
				<p class="hero-subtitle">
					{t('home.subtitle')}
				</p>
				<div class="cta-buttons">
					<a href="/products" class="btn btn-primary">{t('home.view_work')}</a>
					<a href="/about" class="btn btn-secondary">{t('home.our_philosophy')}</a>
				</div>
			</div>
			
			<div class="hero-visual" class:visible={isVisible}>
				<div class="code-window">
					<div class="window-header">
						<div class="window-controls">
							<span class="control close"></span>
							<span class="control minimize"></span>
							<span class="control maximize"></span>
						</div>
						<span class="window-title">qoder-app.ts</span>
					</div>
					<pre class="code-content"><code>// Sample code placeholder
// Elegant software solutions here</code></pre>
				</div>
			</div>
		</div>
	</section>

	<section class="philosophy-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title">{t('home.philosophy_title')}</h2>
				<p class="section-description">
					{t('home.subtitle')}
				</p>
			</div>
			
			<div class="philosophy-grid">
				<div class="philosophy-card">
					<div class="card-icon">
						<span class="icon-code">&lt;/&gt;</span>
					</div>
					<h3>{t('home.clean_code')}</h3>
					<p>{t('home.clean_code_desc')}</p>
				</div>
									
				<div class="philosophy-card">
					<div class="card-icon">
						<span class="icon-user">👤</span>
					</div>
					<h3>{t('home.user_centric')}</h3>
					<p>{t('home.user_centric_desc')}</p>
				</div>
									
				<div class="philosophy-card">
					<div class="card-icon">
						<span class="icon-innovation">⚡</span>
					</div>
					<h3>{t('home.innovation')}</h3>
					<p>{t('home.innovation_desc')}</p>
				</div>
			</div>
		</div>
	</section>

	<section class="featured-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title">{t('components.featured_applications')}</h2>
				<a href="/products" class="view-all-link">{t('components.view_all_projects')}</a>
			</div>
			<div class="placeholder-content">
				<p class="placeholder-text">{t('products.placeholder')}</p>
			</div>
		</div>
	</section>
</div>

<style>
	.home-page {
		animation: fadeIn 0.8s ease-out;
	}

	.hero-section {
		min-height: 80vh;
		display: flex;
		align-items: center;
		padding: var(--spacing-3xl) 0;
		position: relative;
		overflow: hidden;
	}

	.hero-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-3xl);
		align-items: center;
	}

	.brand-intro {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
	}

	.brand-intro.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.hero-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		line-height: 1.1;
		margin-bottom: var(--spacing-lg);
		font-weight: 800;
	}

	.highlight-lime {
		background: linear-gradient(135deg, var(--color-lime) 0%, var(--color-fuchsia) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: var(--text-xl);
		color: var(--color-warm-text-light);
		line-height: 1.6;
		margin-bottom: var(--spacing-2xl);
		max-width: 600px;
	}

	.cta-buttons {
		display: flex;
		gap: var(--spacing-md);
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

	.hero-visual {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.2s;
	}

	.hero-visual.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.code-window {
		background: var(--color-gray-900);
		border-radius: 16px;
		overflow: hidden;
		box-shadow: var(--shadow-md);
		border: 1px solid var(--color-gray-700);
	}

	.window-header {
		background: var(--color-gray-800);
		padding: var(--spacing-sm) var(--spacing-md);
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--color-gray-700);
	}

	.window-controls {
		display: flex;
		gap: var(--spacing-xs);
	}

	.control {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.control.close {
		background: var(--color-peach);
	}

	.control.minimize {
		background: var(--color-lime);
	}

	.control.maximize {
		background: var(--color-fuchsia);
	}

	.window-title {
		color: var(--color-gray-300);
		font-size: var(--text-sm);
		font-family: var(--font-mono);
	}

	.code-content {
		padding: var(--spacing-lg);
		margin: 0;
		overflow-x: auto;
	}

	code {
		color: var(--color-gray-300);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		line-height: 1.5;
	}

	.philosophy-section {
		padding: var(--spacing-3xl) 0;
		background: linear-gradient(to bottom, var(--color-warm-bg-alt), var(--color-warm-bg));
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--spacing-3xl);
	}

	.section-title {
		font-size: var(--text-4xl);
		margin-bottom: var(--spacing-md);
		color: var(--color-gray-900);
	}

	.section-description {
		font-size: var(--text-xl);
		color: var(--color-warm-text-light);
		max-width: 600px;
		margin: 0 auto;
	}

	.philosophy-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-xl);
	}

	.philosophy-card {
		background: white;
		padding: var(--spacing-xl);
		border-radius: 20px;
		box-shadow: var(--shadow-soft);
		transition: all var(--transition-normal);
		border: 1px solid var(--color-gray-100);
		text-align: center;
	}

	.philosophy-card:hover {
		transform: translateY(-8px);
		box-shadow: var(--shadow-md);
		border-color: var(--color-lime);
	}

	.card-icon {
		width: 70px;
		height: 70px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-lime) 0%, var(--color-fuchsia) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto var(--spacing-lg);
		font-size: var(--text-2xl);
	}

	.philosophy-card h3 {
		font-size: var(--text-xl);
		margin-bottom: var(--spacing-md);
		color: var(--color-warm-text);
	}

	.philosophy-card p {
		color: var(--color-warm-text-light);
		line-height: 1.6;
	}

	.featured-section {
		padding: var(--spacing-3xl) 0;
	}

	.view-all-link {
		color: var(--color-lime);
		font-weight: 600;
		text-decoration: none;
		font-family: var(--font-mono);
		transition: var(--transition-fast);
	}

	.view-all-link:hover {
		color: var(--color-fuchsia);
		text-decoration: underline;
	}

	.placeholder-content {
		text-align: center;
		padding: var(--spacing-2xl);
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		border: 1px solid var(--glass-border);
		color: var(--color-warm-text-light);
	}

	.placeholder-text {
		color: var(--color-warm-text-lighter);
		font-style: italic;
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
		.hero-content {
			grid-template-columns: 1fr;
			gap: var(--spacing-2xl);
			text-align: center;
		}
		
		.hero-subtitle {
			margin-left: auto;
			margin-right: auto;
		}
		
		.cta-buttons {
			justify-content: center;
		}
	}

	@media (max-width: 768px) {
		.hero-section {
			padding: var(--spacing-2xl) 0;
			min-height: auto;
		}
		
		.philosophy-grid {
			grid-template-columns: 1fr;
		}
		
		.btn {
			width: 100%;
			text-align: center;
		}
		
		.cta-buttons {
			flex-direction: column;
		}
	}
</style>