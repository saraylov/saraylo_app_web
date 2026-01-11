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
			// For "Deploy from a branch" with root directory, we don't need base path
			paths: {
				base: ''
			},
			// Configure fallback for SPA routing on GitHub Pages
			// This creates a 200.html file that handles all routes
			fallback: 'index.html',
			// Allow dynamic routes that can't be prerendered
			// API routes and dynamic pages will be handled client-side
			strict: false,
			// Ensure proper module handling for older browsers
			preloadStrategy: 'modulepreload'
		})
	}
};

export default config;