import * as server from '../entries/pages/about/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/about/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.BjGiox61.js","_app/immutable/chunks/CIwNi43B.js","_app/immutable/chunks/Ptpia6gp.js","_app/immutable/chunks/Cl1NHols.js","_app/immutable/chunks/C-nNA3VV.js","_app/immutable/chunks/DwPd_k2q.js","_app/immutable/chunks/D8maNenV.js","_app/immutable/chunks/BOPlYAmw.js"];
export const stylesheets = ["_app/immutable/assets/3.ZSU-nWkx.css"];
export const fonts = [];
