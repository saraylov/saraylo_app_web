import { x as attr_class, w as ensure_array_like, G as bind_props } from "./index.js";
import { t } from "./index2.js";
import { e as escape_html } from "./context.js";
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
    $$renderer2.push(`<!--]--></div> <button class="view-details-link svelte-11ja2cl">${escape_html(t("components.view_details"))}</button></div> <div${attr_class("hover-effect svelte-11ja2cl", void 0, { "active": isHovered })}></div></article>`);
    bind_props($$props, { product });
  });
}
export {
  ProductCard as P
};
