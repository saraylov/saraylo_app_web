import * as server from '../entries/pages/contact/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/contact/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/contact/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.CQbZkewu.js","_app/immutable/chunks/CIwNi43B.js","_app/immutable/chunks/Ptpia6gp.js","_app/immutable/chunks/Cl1NHols.js","_app/immutable/chunks/_TwS7Iaw.js","_app/immutable/chunks/BAgEtrgb.js","_app/immutable/chunks/DwPd_k2q.js","_app/immutable/chunks/BOPlYAmw.js","_app/immutable/chunks/CdEA5IGF.js"];
export const stylesheets = ["_app/immutable/assets/4.DiE6mp9V.css"];
export const fonts = [];
