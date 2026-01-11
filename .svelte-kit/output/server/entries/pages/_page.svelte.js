import { x as attr_class, w as ensure_array_like } from "../../chunks/index.js";
import { t } from "../../chunks/index2.js";
import { p as products } from "../../chunks/products.js";
import { P as ProductCard } from "../../chunks/ProductModal.svelte_svelte_type_style_lang.js";
import { e as escape_html } from "../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isVisible = false;
    $$renderer2.push(`<div class="home-page svelte-1uha8ag"><section class="hero-section svelte-1uha8ag"><div class="hero-content container svelte-1uha8ag"><div${attr_class("brand-intro svelte-1uha8ag", void 0, { "visible": isVisible })}><h1 class="hero-title svelte-1uha8ag"><span class="highlight-lime svelte-1uha8ag">Saraylo</span> <br/> ${escape_html(t("home.title"))}</h1> <p class="hero-subtitle svelte-1uha8ag">${escape_html(t("home.subtitle"))}</p> <div class="cta-buttons svelte-1uha8ag"><a href="/products" class="btn btn-primary svelte-1uha8ag">${escape_html(t("home.view_work"))}</a> <a href="/about" class="btn btn-secondary svelte-1uha8ag">${escape_html(t("home.our_philosophy"))}</a></div></div> <div${attr_class("hero-visual svelte-1uha8ag", void 0, { "visible": isVisible })}><div class="code-window svelte-1uha8ag"><div class="window-header svelte-1uha8ag"><div class="window-controls svelte-1uha8ag"><span class="control close svelte-1uha8ag"></span> <span class="control minimize svelte-1uha8ag"></span> <span class="control maximize svelte-1uha8ag"></span></div> <span class="window-title svelte-1uha8ag">qoder-app.ts</span></div> <pre class="code-content svelte-1uha8ag"><code class="svelte-1uha8ag">// Sample code placeholder
// Elegant software solutions here</code></pre></div></div></div></section> <section class="philosophy-section svelte-1uha8ag"><div class="container"><div class="section-header svelte-1uha8ag"><h2 class="section-title svelte-1uha8ag">${escape_html(t("home.philosophy_title"))}</h2> <p class="section-description svelte-1uha8ag">${escape_html(t("home.subtitle"))}</p></div> <div class="philosophy-grid svelte-1uha8ag"><div class="philosophy-card svelte-1uha8ag"><div class="card-icon svelte-1uha8ag"><span class="icon-code">&lt;/></span></div> <h3 class="svelte-1uha8ag">${escape_html(t("home.clean_code"))}</h3> <p class="svelte-1uha8ag">${escape_html(t("home.clean_code_desc"))}</p></div> <div class="philosophy-card svelte-1uha8ag"><div class="card-icon svelte-1uha8ag"><span class="icon-user">👤</span></div> <h3 class="svelte-1uha8ag">${escape_html(t("home.user_centric"))}</h3> <p class="svelte-1uha8ag">${escape_html(t("home.user_centric_desc"))}</p></div> <div class="philosophy-card svelte-1uha8ag"><div class="card-icon svelte-1uha8ag"><span class="icon-innovation">⚡</span></div> <h3 class="svelte-1uha8ag">${escape_html(t("home.innovation"))}</h3> <p class="svelte-1uha8ag">${escape_html(t("home.innovation_desc"))}</p></div></div></div></section> <section class="featured-section svelte-1uha8ag"><div class="container"><div class="section-header svelte-1uha8ag"><h2 class="section-title svelte-1uha8ag">${escape_html(t("components.featured_applications"))}</h2> <a href="/products" class="view-all-link svelte-1uha8ag">${escape_html(t("components.view_all_projects"))}</a></div> <div class="products-grid svelte-1uha8ag"><!--[-->`);
    const each_array = ensure_array_like(products);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let product = each_array[$$index];
      ProductCard($$renderer2, { product });
    }
    $$renderer2.push(`<!--]--></div></div></section> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
