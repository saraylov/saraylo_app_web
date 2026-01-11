import * as server from '../entries/pages/products/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/products/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/products/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.BaZczT4B.js","_app/immutable/chunks/CSMTX6pb.js","_app/immutable/chunks/D6D-lzwe.js","_app/immutable/chunks/D43ao2JA.js","_app/immutable/chunks/Db2X8iEw.js","_app/immutable/chunks/BOxDSPY6.js","_app/immutable/chunks/B_yeyZDL.js","_app/immutable/chunks/it92oAf-.js","_app/immutable/chunks/Dr4MgrxQ.js","_app/immutable/chunks/BrFe7kwN.js","_app/immutable/chunks/BD7MZ89G.js","_app/immutable/chunks/CdEA5IGF.js","_app/immutable/chunks/C-Gqmohk.js","_app/immutable/chunks/CPvjtsE9.js","_app/immutable/chunks/CwfNmMKf.js","_app/immutable/chunks/BUApaBEI.js"];
export const stylesheets = ["_app/immutable/assets/5.AiTseZFV.css"];
export const fonts = [];
