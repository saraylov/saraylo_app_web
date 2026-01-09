
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/about" | "/contact" | "/products" | "/products/[id]";
		RouteParams(): {
			"/products/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/about": Record<string, never>;
			"/contact": Record<string, never>;
			"/products": { id?: string };
			"/products/[id]": { id: string }
		};
		Pathname(): "/" | "/about" | "/about/" | "/contact" | "/contact/" | "/products" | "/products/" | `/products/${string}` & {} | `/products/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.png" | "/images/codevault-1.jpg" | "/images/placeholder-thumb.jpg" | "/images/placeholder.jpg" | "/images/taskflow-1.jpg" | "/images/taskflow-2.jpg" | string & {};
	}
}