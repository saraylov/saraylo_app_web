import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-static generates static files for GitHub Pages
		adapter: adapter({
			// GitHub Pages serves from /repo-name/, so we need to set the base path
			// Replace 'saraylo_app_web' with your actual repository name
			paths: {
				base: '/saraylo_app_web'
			},
			// Allow dynamic routes that can't be prerendered
			// API routes and dynamic pages will be handled client-side
			strict: false
		})
	}
};

export default config;