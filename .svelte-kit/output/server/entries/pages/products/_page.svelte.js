import { x as attr_class, w as ensure_array_like, y as attr, G as bind_props, F as attr_style, J as stringify } from "../../../chunks/index.js";
import { t } from "../../../chunks/index2.js";
import { e as escape_html } from "../../../chunks/context.js";
function ProductCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let product = $$props["product"];
    let isHovered = false;
    $$renderer2.push(`<article class="product-card svelte-11ja2cl"><div class="card-header svelte-11ja2cl"><div class="product-icon svelte-11ja2cl">${escape_html(product.icon)}</div> <span${attr_class("product-type svelte-11ja2cl", void 0, {
      "desktop": product.type === "desktop",
      "mobile": product.type === "mobile"
    })}>${escape_html(product.type === "desktop" ? t("components.product_type_desktop") : t("components.product_type_mobile"))}</span></div> <div class="card-content svelte-11ja2cl"><h3 class="product-name svelte-11ja2cl">${escape_html(product.name)}</h3> <p class="product-description svelte-11ja2cl">${escape_html(product.description)}</p> <div class="features-preview svelte-11ja2cl"><!--[-->`);
    const each_array = ensure_array_like(product.features.slice(0, 3));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let feature = each_array[$$index];
      $$renderer2.push(`<span class="feature-tag svelte-11ja2cl">${escape_html(feature)}</span>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (product.features.length > 3) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="more-features svelte-11ja2cl">+${escape_html(product.features.length - 3)} more</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="card-footer svelte-11ja2cl"><div class="tech-stack svelte-11ja2cl"><!--[-->`);
    const each_array_1 = ensure_array_like(product.technologies.slice(0, 3));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let tech = each_array_1[$$index_1];
      $$renderer2.push(`<span class="tech-item svelte-11ja2cl">${escape_html(tech)}</span>`);
    }
    $$renderer2.push(`<!--]--></div> <a${attr("href", `/products/${product.id}`)} class="view-details-link svelte-11ja2cl">${escape_html(t("components.view_details"))}</a></div> <div${attr_class("hover-effect svelte-11ja2cl", void 0, { "active": isHovered })}></div></article>`);
    bind_props($$props, { product });
  });
}
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
      $$renderer2.push(`<!--]--></div>`);
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
