export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "saraylo_app_web/_app",
	assets: new Set(["404.html","favicon.png","images/codevault-1.jpg","images/placeholder-thumb.jpg","images/placeholder.jpg","images/taskflow-1.jpg","images/taskflow-2.jpg","spa-redirect.html"]),
	mimeTypes: {".html":"text/html",".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.BlL10xAI.js",app:"_app/immutable/entry/app.CYn2a_zk.js",imports:["_app/immutable/entry/start.BlL10xAI.js","_app/immutable/chunks/BvOqyng3.js","_app/immutable/chunks/Ptpia6gp.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/Bn29Dg7q.js","_app/immutable/entry/app.CYn2a_zk.js","_app/immutable/chunks/Ptpia6gp.js","_app/immutable/chunks/CIwNi43B.js","_app/immutable/chunks/_TwS7Iaw.js","_app/immutable/chunks/BJ-_gbY8.js","_app/immutable/chunks/XoEbZs8-.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/api/v1/auth/login",
				pattern: /^\/api\/v1\/auth\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/auth/login/_server.ts.js'))
			},
			{
				id: "/api/v1/backups",
				pattern: /^\/api\/v1\/backups\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/backups/_server.ts.js'))
			},
			{
				id: "/api/v1/backups/[id]",
				pattern: /^\/api\/v1\/backups\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/backups/_id_/_server.ts.js'))
			},
			{
				id: "/api/v1/backups/[id]/restore",
				pattern: /^\/api\/v1\/backups\/([^/]+?)\/restore\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/backups/_id_/restore/_server.ts.js'))
			},
			{
				id: "/api/v1/navigation",
				pattern: /^\/api\/v1\/navigation\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/navigation/_server.ts.js'))
			},
			{
				id: "/api/v1/navigation/[id]",
				pattern: /^\/api\/v1\/navigation\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/navigation/_id_/_server.ts.js'))
			},
			{
				id: "/api/v1/navigation/[id]/delete",
				pattern: /^\/api\/v1\/navigation\/([^/]+?)\/delete\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/navigation/_id_/delete/_server.ts.js'))
			},
			{
				id: "/api/v1/products",
				pattern: /^\/api\/v1\/products\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/products/_server.ts.js'))
			},
			{
				id: "/api/v1/products/[id]",
				pattern: /^\/api\/v1\/products\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/products/_id_/_server.ts.js'))
			},
			{
				id: "/api/v1/products/[id]/delete",
				pattern: /^\/api\/v1\/products\/([^/]+?)\/delete\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/products/_id_/delete/_server.ts.js'))
			},
			{
				id: "/api/v1/team-members",
				pattern: /^\/api\/v1\/team-members\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/team-members/_server.ts.js'))
			},
			{
				id: "/api/v1/team-members/[id]",
				pattern: /^\/api\/v1\/team-members\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/team-members/_id_/_server.ts.js'))
			},
			{
				id: "/api/v1/team-members/[id]/delete",
				pattern: /^\/api\/v1\/team-members\/([^/]+?)\/delete\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/team-members/_id_/delete/_server.ts.js'))
			},
			{
				id: "/products/[id]",
				pattern: /^\/products\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set(["/saraylo_app_web/","/saraylo_app_web/about","/saraylo_app_web/contact","/saraylo_app_web/products"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
