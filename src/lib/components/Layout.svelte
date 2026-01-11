<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import type { NavigationItem } from '$lib/types';
	import { t } from '$lib/i18n';
	import LanguageSwitcher from '$lib/components/ui/LanguageSwitcher.svelte';
	
	let isOpen = false;
	let currentPath = '';
	
	const navigationItems: NavigationItem[] = [
		{ id: 'home', label: t('nav.home'), path: base + '/' },
		{ id: 'products', label: t('nav.products'), path: base + '/products' },
		{ id: 'about', label: t('nav.about'), path: base + '/about' },
		{ id: 'contact', label: t('nav.contact'), path: base + '/contact' }
	];
	
	onMount(() => {
		currentPath = window.location.pathname;
	});
	
	function toggleMenu() {
		isOpen = !isOpen;
	}
	
	function isActive(path: string): boolean {
		// Remove base path for comparison
		const normalizedCurrentPath = currentPath.replace(base, '') || '/';
		const normalizedPath = path.replace(base, '') || '/';
		return normalizedCurrentPath === normalizedPath || (normalizedPath !== '/' && normalizedCurrentPath.startsWith(normalizedPath));
	}
</script>

<div class="layout">
	<!-- Mobile menu button -->
	<button 
		class="mobile-menu-button" 
		on:click={toggleMenu}
		aria-label="Toggle navigation menu"
	>
		<div class="menu-icon">
			<span class:active={isOpen}></span>
			<span class:active={isOpen}></span>
			<span class:active={isOpen}></span>
		</div>
	</button>

	<!-- Sidebar Navigation -->
	<nav class="sidebar" class:open={isOpen}>
		<div class="logo-container">
			<h1 class="logo">Saraylo</h1>
			<p class="tagline">Software Development Studio</p>
		</div>
		
		<ul class="nav-list">
			{#each navigationItems as item}
				<li class="nav-item">
					<a 
						href={item.path} 
						class="nav-link" 
						class:active={isActive(item.path)}
						on:click={() => isOpen = false}
					>
						<span class="nav-text">{item.label}</span>
						{#if isActive(item.path)}
							<div class="active-indicator"></div>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
		
		<div class="sidebar-footer">
			<div class="tech-stack">
				<span class="tech-item">Svelte</span>
				<span class="tech-item">TypeScript</span>
				<span class="tech-item">Node.js</span>
			</div>
			<LanguageSwitcher />
		</div>
	</nav>

	<!-- Main Content Area -->
	<main class="main-content">
		<slot />
	</main>

	<!-- Mobile overlay -->
	{#if isOpen}
		<div class="mobile-overlay" on:click={() => isOpen = false}></div>
	{/if}
</div>

<style>
	.layout {
		display: flex;
		min-height: 100vh;
		position: relative;
	}

	.mobile-menu-button {
		display: none;
		position: fixed;
		top: var(--spacing-md);
		left: var(--spacing-md);
		z-index: 1001;
		width: 40px;
		height: 40px;
		border-radius: 8px;
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
		align-items: center;
		justify-content: center;
		transition: var(--transition-fast);
	}

	.menu-icon {
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 20px;
	}

	.menu-icon span {
		height: 2px;
		background: var(--color-gray-700);
		transition: var(--transition-fast);
		transform-origin: center;
	}

	.menu-icon span:nth-child(1) {
		width: 100%;
	}

	.menu-icon span:nth-child(2) {
		width: 70%;
	}

	.menu-icon span:nth-child(3) {
		width: 40%;
	}

	.menu-icon span.active:nth-child(1) {
		transform: rotate(45deg) translate(4px, 4px);
		width: 100%;
	}

	.menu-icon span.active:nth-child(2) {
		opacity: 0;
		width: 0;
	}

	.menu-icon span.active:nth-child(3) {
		transform: rotate(-45deg) translate(6px, -6px);
		width: 100%;
	}

	.sidebar {
		width: 280px;
		background: linear-gradient(135deg, var(--color-warm-bg) 0%, var(--color-warm-neutral) 100%);
		border-right: 1px solid var(--color-warm-border);
		display: flex;
		flex-direction: column;
		padding: var(--spacing-xl);
		position: sticky;
		top: 0;
		height: 100vh;
		transition: var(--transition-normal);
		z-index: 1000;
	}

	.logo-container {
		margin-bottom: var(--spacing-2xl);
		text-align: center;
	}

	.logo {
		font-size: var(--text-3xl);
		font-weight: 700;
		color: var(--color-warm-text);
		margin-bottom: var(--spacing-xs);
		letter-spacing: -0.02em;
		background: linear-gradient(135deg, var(--color-lime) 0%, var(--color-fuchsia) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.tagline {
		font-size: var(--text-sm);
		color: var(--color-warm-text-lighter);
		font-weight: 400;
	}

	.nav-list {
		list-style: none;
		flex-grow: 1;
	}

	.nav-item {
		margin-bottom: var(--spacing-sm);
	}

	.nav-link {
		display: flex;
		align-items: center;
		padding: var(--spacing-md);
		border-radius: 12px;
		color: var(--color-warm-text-light);
		font-weight: 500;
		transition: all var(--transition-fast);
		position: relative;
		overflow: hidden;
	}

	.nav-link:hover {
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		color: var(--color-warm-text);
		transform: translateX(4px);
	}

	.nav-link.active {
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		color: var(--color-warm-text);
		border-left: 3px solid var(--color-lime);
	}

	.active-indicator {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-lime);
		box-shadow: var(--glow-lime);
	}

	.sidebar-footer {
		padding-top: var(--spacing-xl);
		border-top: 1px solid var(--color-warm-border);
	}

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
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

	.main-content {
		flex: 1;
		background: var(--color-warm-bg);
		min-height: 100vh;
		padding: var(--spacing-xl);
	}

	.mobile-overlay {
		display: none;
	}

	/* Responsive styles */
	@media (max-width: 1024px) {
		.sidebar {
			position: fixed;
			left: -280px;
			box-shadow: var(--shadow-md);
		}

		.sidebar.open {
			left: 0;
		}

		.mobile-menu-button {
			display: flex;
		}

		.mobile-overlay {
			display: block;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 999;
			backdrop-filter: blur(4px);
		}

		.main-content {
			padding: calc(var(--spacing-xl) + 60px) var(--spacing-lg) var(--spacing-lg);
		}
	}

	@media (max-width: 768px) {
		.sidebar {
			width: 260px;
		}
		
		.main-content {
			padding: calc(var(--spacing-xl) + 60px) var(--spacing-md) var(--spacing-md);
		}
	}
</style>