import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use static adapter for GitHub Pages deployment
		adapter: adapter({
			// Enable fallback for client-side routing
			fallback: '404.html'
		}),
		// Set base path for GitHub Pages
		paths: {
			base: '/saraylo_app_web'
		},
		// Handle prerender errors for base path mismatch
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore base path mismatch errors
				if (message.includes('does not begin with `base`')) {
					return;
				}
				// Throw other errors
				throw new Error(message);
			}
		}
	}
};

export default config;