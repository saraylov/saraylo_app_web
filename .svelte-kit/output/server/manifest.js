export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "saraylo_app_web/_app",
	assets: new Set([".nojekyll","404.html","favicon.png","images/codevault-1.jpg","images/placeholder-thumb.jpg","images/placeholder.jpg","images/taskflow-1.jpg","images/taskflow-2.jpg"]),
	mimeTypes: {".html":"text/html",".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.BCw8ci3q.js",app:"_app/immutable/entry/app.DHIHujWl.js",imports:["_app/immutable/entry/start.BCw8ci3q.js","_app/immutable/chunks/B64UkETU.js","_app/immutable/chunks/BJx0h4yH.js","_app/immutable/chunks/CYgJF_JY.js","_app/immutable/chunks/anYjChO1.js","_app/immutable/chunks/8UtF8RsF.js","_app/immutable/entry/app.DHIHujWl.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/anYjChO1.js","_app/immutable/chunks/8UtF8RsF.js","_app/immutable/chunks/BJx0h4yH.js","_app/immutable/chunks/CCa8LpMy.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/products",
				pattern: /^\/products\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/products/[id]",
				pattern: /^\/products\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
