import * as server from '../entries/pages/contact/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/contact/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/contact/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.CmcUE_1Y.js","_app/immutable/chunks/CSMTX6pb.js","_app/immutable/chunks/D6D-lzwe.js","_app/immutable/chunks/D43ao2JA.js","_app/immutable/chunks/Db2X8iEw.js","_app/immutable/chunks/BD7MZ89G.js","_app/immutable/chunks/B_yeyZDL.js","_app/immutable/chunks/Dr4MgrxQ.js"];
export const stylesheets = ["_app/immutable/assets/4.DiE6mp9V.css"];
export const fonts = [];
