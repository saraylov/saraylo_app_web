import * as server from '../entries/pages/products/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/products/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/products/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.bSPRZUYc.js","_app/immutable/chunks/CIwNi43B.js","_app/immutable/chunks/Ptpia6gp.js","_app/immutable/chunks/Cl1NHols.js","_app/immutable/chunks/_TwS7Iaw.js","_app/immutable/chunks/C-nNA3VV.js","_app/immutable/chunks/DwPd_k2q.js","_app/immutable/chunks/D8maNenV.js","_app/immutable/chunks/BOPlYAmw.js","_app/immutable/chunks/BrFe7kwN.js","_app/immutable/chunks/DfbbH_16.js","_app/immutable/chunks/CdEA5IGF.js","_app/immutable/chunks/XoEbZs8-.js","_app/immutable/chunks/BAgEtrgb.js","_app/immutable/chunks/BJ-_gbY8.js"];
export const stylesheets = ["_app/immutable/assets/ProductModal.DjMkRfHj.css","_app/immutable/assets/5.DGIv8GQj.css"];
export const fonts = [];
