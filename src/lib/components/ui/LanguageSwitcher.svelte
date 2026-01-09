<script lang="ts">
	import { onMount } from 'svelte';
	import { changeLocale, getCurrentLocale, locales } from '$lib/i18n';
	
	let currentLocale = 'en';
	
	onMount(() => {
		currentLocale = getCurrentLocale();
	});
	
	function switchLanguage(locale: string) {
		changeLocale(locale);
	}
</script>

<div class="language-switcher">
	<select 
		class="locale-select" 
		bind:value={currentLocale} 
		on:change={() => switchLanguage(currentLocale)}
	>
		{#each Object.entries(locales) as [key, label]}
			<option value={key}>{label}</option>
		{/each}
	</select>
</div>

<style>
	.language-switcher {
		padding: var(--spacing-sm);
	}
	
	.locale-select {
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: 1px solid var(--glass-border);
		border-radius: 8px;
		padding: var(--spacing-xs) var(--spacing-sm);
		color: var(--color-warm-text);
		font-family: var(--font-mono);
		cursor: pointer;
	}
	
	.locale-select:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-lime);
	}
</style>