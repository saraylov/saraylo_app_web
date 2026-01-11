import { x as attr_class, y as attr, J as stringify, w as ensure_array_like, G as bind_props } from "../../../../chunks/index.js";
import { t } from "../../../../chunks/index2.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let currentImageIndex = 0;
    let isVisible = false;
    $$renderer2.push(`<div class="product-detail-page svelte-9lltit"><section class="hero-section svelte-9lltit"><div class="container"><div${attr_class("product-header svelte-9lltit", void 0, { "visible": isVisible })}><div class="header-content svelte-9lltit"><div class="product-meta svelte-9lltit"><div class="product-icon-large svelte-9lltit">${escape_html(data.product.icon)}</div> <span${attr_class("product-type", void 0, {
      "desktop": data.product.type === "desktop",
      "mobile": data.product.type === "mobile"
    })}>${escape_html(data.product.type)}</span></div> <div class="header-text svelte-9lltit"><h1 class="product-title svelte-9lltit">${escape_html(data.product.name)}</h1> <p class="product-tagline svelte-9lltit">${escape_html(data.product.description)}</p> <div class="release-info svelte-9lltit">Released: ${escape_html(data.product.releaseDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }))}</div></div></div></div></div></section> <section class="gallery-section svelte-9lltit"><div class="container"><div${attr_class("image-gallery svelte-9lltit", void 0, { "visible": isVisible })}><div class="main-image-container svelte-9lltit"><img${attr("src", data.product.images[currentImageIndex])}${attr("alt", `${stringify(data.product.name)} screenshot`)} class="main-image svelte-9lltit"/> `);
    if (data.product.images.length > 1) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="nav-button prev svelte-9lltit">←</button> <button class="nav-button next svelte-9lltit">→</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (data.product.images.length > 1) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="thumbnails svelte-9lltit"><!--[-->`);
      const each_array = ensure_array_like(data.product.images);
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let image = each_array[index];
        $$renderer2.push(`<button${attr_class("thumbnail svelte-9lltit", void 0, { "active": index === currentImageIndex })}><img${attr("src", image)}${attr("alt", `Thumbnail ${stringify(index + 1)}`)} class="svelte-9lltit"/></button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="details-section svelte-9lltit"><div class="container"><div${attr_class("details-grid svelte-9lltit", void 0, { "visible": isVisible })}><div class="features-section"><h2 class="section-title svelte-9lltit">Key Features</h2> <ul class="features-list svelte-9lltit"><!--[-->`);
    const each_array_1 = ensure_array_like(data.product.features);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let feature = each_array_1[$$index_1];
      $$renderer2.push(`<li class="feature-item svelte-9lltit"><span class="feature-icon svelte-9lltit">✓</span> <span class="feature-text">${escape_html(feature)}</span></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div class="tech-section"><h2 class="section-title svelte-9lltit">Technology Stack</h2> <div class="tech-tags svelte-9lltit"><!--[-->`);
    const each_array_2 = ensure_array_like(data.product.technologies);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let tech = each_array_2[$$index_2];
      $$renderer2.push(`<span class="tech-tag svelte-9lltit">${escape_html(tech)}</span>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div></section> <section class="cta-section svelte-9lltit"><div class="container"><div${attr_class("cta-content svelte-9lltit", void 0, { "visible": isVisible })}><h2 class="svelte-9lltit">${escape_html(t("common.ready_get_started"))}</h2> <p class="svelte-9lltit">${escape_html(t("common.download_cta").replace("{name}", data.product.name))}</p> <div class="cta-buttons svelte-9lltit"><button class="btn btn-primary svelte-9lltit">${escape_html(t("common.download_now"))}</button> <a href="/products" class="btn btn-secondary svelte-9lltit">${escape_html(t("common.view_other_apps"))}</a></div></div></div></section></div>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
