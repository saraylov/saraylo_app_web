
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
		RouteId(): "/" | "/about" | "/api" | "/api/v1" | "/api/v1/auth" | "/api/v1/auth/login" | "/api/v1/backups" | "/api/v1/backups/[id]" | "/api/v1/backups/[id]/restore" | "/api/v1/navigation" | "/api/v1/navigation/[id]" | "/api/v1/navigation/[id]/delete" | "/api/v1/products" | "/api/v1/products/create" | "/api/v1/products/[id]" | "/api/v1/products/[id]/delete" | "/api/v1/team-members" | "/api/v1/team-members/[id]" | "/api/v1/team-members/[id]/delete" | "/contact" | "/products" | "/products/[id]";
		RouteParams(): {
			"/api/v1/backups/[id]": { id: string };
			"/api/v1/backups/[id]/restore": { id: string };
			"/api/v1/navigation/[id]": { id: string };
			"/api/v1/navigation/[id]/delete": { id: string };
			"/api/v1/products/[id]": { id: string };
			"/api/v1/products/[id]/delete": { id: string };
			"/api/v1/team-members/[id]": { id: string };
			"/api/v1/team-members/[id]/delete": { id: string };
			"/products/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/about": Record<string, never>;
			"/api": { id?: string };
			"/api/v1": { id?: string };
			"/api/v1/auth": Record<string, never>;
			"/api/v1/auth/login": Record<string, never>;
			"/api/v1/backups": { id?: string };
			"/api/v1/backups/[id]": { id: string };
			"/api/v1/backups/[id]/restore": { id: string };
			"/api/v1/navigation": { id?: string };
			"/api/v1/navigation/[id]": { id: string };
			"/api/v1/navigation/[id]/delete": { id: string };
			"/api/v1/products": { id?: string };
			"/api/v1/products/create": Record<string, never>;
			"/api/v1/products/[id]": { id: string };
			"/api/v1/products/[id]/delete": { id: string };
			"/api/v1/team-members": { id?: string };
			"/api/v1/team-members/[id]": { id: string };
			"/api/v1/team-members/[id]/delete": { id: string };
			"/contact": Record<string, never>;
			"/products": { id?: string };
			"/products/[id]": { id: string }
		};
		Pathname(): "/" | "/about" | "/about/" | "/api" | "/api/" | "/api/v1" | "/api/v1/" | "/api/v1/auth" | "/api/v1/auth/" | "/api/v1/auth/login" | "/api/v1/auth/login/" | "/api/v1/backups" | "/api/v1/backups/" | `/api/v1/backups/${string}` & {} | `/api/v1/backups/${string}/` & {} | `/api/v1/backups/${string}/restore` & {} | `/api/v1/backups/${string}/restore/` & {} | "/api/v1/navigation" | "/api/v1/navigation/" | `/api/v1/navigation/${string}` & {} | `/api/v1/navigation/${string}/` & {} | `/api/v1/navigation/${string}/delete` & {} | `/api/v1/navigation/${string}/delete/` & {} | "/api/v1/products" | "/api/v1/products/" | "/api/v1/products/create" | "/api/v1/products/create/" | `/api/v1/products/${string}` & {} | `/api/v1/products/${string}/` & {} | `/api/v1/products/${string}/delete` & {} | `/api/v1/products/${string}/delete/` & {} | "/api/v1/team-members" | "/api/v1/team-members/" | `/api/v1/team-members/${string}` & {} | `/api/v1/team-members/${string}/` & {} | `/api/v1/team-members/${string}/delete` & {} | `/api/v1/team-members/${string}/delete/` & {} | "/contact" | "/contact/" | "/products" | "/products/" | `/products/${string}` & {} | `/products/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/404.html" | "/favicon.png" | "/images/codevault-1.jpg" | "/images/placeholder-thumb.jpg" | "/images/placeholder.jpg" | "/images/taskflow-1.jpg" | "/images/taskflow-2.jpg" | "/spa-redirect.html" | string & {};
	}
}