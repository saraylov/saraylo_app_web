import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import "./state.svelte.js";
function invalidateAll() {
  {
    throw new Error("Cannot call invalidateAll() on the server");
  }
}
async function handleNavigation(url) {
  const basePath = "/saraylo_app_web";
  if (url.pathname.startsWith(basePath)) {
    const newPath = url.pathname.substring(basePath.length) || "/";
    history.pushState({}, "", newPath);
    await invalidateAll();
  }
}
function setupNavigationHandler() {
  document.addEventListener("click", async (event) => {
    const target = event.target;
    const link = target.closest("a");
    if (link && link.href) {
      const url = new URL(link.href);
      if (url.origin === window.location.origin) {
        event.preventDefault();
        await handleNavigation(url);
      }
    }
  });
  window.addEventListener("popstate", () => {
    invalidateAll();
  });
}
export {
  handleNavigation,
  setupNavigationHandler
};
