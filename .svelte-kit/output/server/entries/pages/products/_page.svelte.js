import { x as attr_class, w as ensure_array_like, F as attr_style, G as bind_props, J as stringify } from "../../../chunks/index.js";
import { P as ProductCard } from "../../../chunks/ProductModal.svelte_svelte_type_style_lang.js";
import { t } from "../../../chunks/index2.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const prerender = true;
    let filteredProducts = [];
    let selectedFilter = "all";
    let isVisible = false;
    const filters = [
      { id: "all", label: t("products.all") },
      { id: "desktop", label: t("products.desktop") },
      { id: "mobile", label: t("products.mobile") }
    ];
    $$renderer2.push(`<div class="products-page svelte-1dj9mz1"><section class="hero-section svelte-1dj9mz1"><div class="container"><div${attr_class("hero-content svelte-1dj9mz1", void 0, { "visible": isVisible })}><h1 class="page-title svelte-1dj9mz1">${escape_html(t("products.title"))}</h1> <p class="page-subtitle svelte-1dj9mz1">${escape_html(t("products.subtitle"))}</p></div></div></section> <section class="filters-section svelte-1dj9mz1"><div class="container"><div${attr_class("filters-container svelte-1dj9mz1", void 0, { "visible": isVisible })}><div class="filter-tabs svelte-1dj9mz1"><!--[-->`);
    const each_array = ensure_array_like(filters);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let filter = each_array[$$index];
      $$renderer2.push(`<button${attr_class("filter-tab svelte-1dj9mz1", void 0, { "active": selectedFilter === filter.id })}>${escape_html(filter.label)} `);
      if (selectedFilter === filter.id) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="tab-indicator svelte-1dj9mz1"></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="results-count svelte-1dj9mz1">${escape_html(filteredProducts.length)} ${escape_html(t("products.found"))}</div></div></div></section> <section class="products-grid-section svelte-1dj9mz1"><div class="container">`);
    if (filteredProducts.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="products-grid svelte-1dj9mz1"><!--[-->`);
      const each_array_1 = ensure_array_like(filteredProducts);
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let product = each_array_1[i];
        $$renderer2.push(`<div${attr_class("product-card-wrapper svelte-1dj9mz1", void 0, { "visible": isVisible })}${attr_style(`animation-delay: ${stringify(i * 0.1)}s`)}>`);
        ProductCard($$renderer2, { product });
        $$renderer2.push(`<!----></div>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="empty-state svelte-1dj9mz1"><div class="empty-icon svelte-1dj9mz1">🔍</div> <h3 class="svelte-1dj9mz1">No applications found</h3> <p class="svelte-1dj9mz1">Try selecting a different filter to see more applications.</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></section></div>`);
    bind_props($$props, { prerender });
  });
}
export {
  _page as default
};
