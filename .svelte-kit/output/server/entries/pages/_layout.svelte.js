import { w as ensure_array_like, x as attr_class, y as attr, z as slot } from "../../chunks/index2.js";
import { b as base } from "../../chunks/server.js";
import "@sveltejs/kit/internal/server";
import { l as locales, t } from "../../chunks/index3.js";
import { e as escape_html } from "../../chunks/context.js";
function LanguageSwitcher($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentLocale = "en";
    $$renderer2.push(`<div class="language-switcher svelte-wj1kq2">`);
    $$renderer2.select(
      { class: "locale-select", value: currentLocale },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(Object.entries(locales));
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let [key, label] = each_array[$$index];
          $$renderer3.option({ value: key }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-wj1kq2"
    );
    $$renderer2.push(`</div>`);
  });
}
function Layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isOpen = false;
    let currentPath = "";
    const navigationItems = [
      { id: "home", label: t("nav.home"), path: base + "/" },
      {
        id: "products",
        label: t("nav.products"),
        path: base + "/products"
      },
      { id: "about", label: t("nav.about"), path: base + "/about" },
      {
        id: "contact",
        label: t("nav.contact"),
        path: base + "/contact"
      }
    ];
    function isActive(path) {
      const normalizedCurrentPath = currentPath.replace(base, "") || "/";
      const normalizedPath = path.replace(base, "") || "/";
      return normalizedCurrentPath === normalizedPath || normalizedPath !== "/" && normalizedCurrentPath.startsWith(normalizedPath);
    }
    $$renderer2.push(`<div class="layout svelte-qgpshq"><button class="mobile-menu-button svelte-qgpshq" aria-label="Toggle navigation menu"><div class="menu-icon svelte-qgpshq"><span${attr_class("svelte-qgpshq", void 0, { "active": isOpen })}></span> <span${attr_class("svelte-qgpshq", void 0, { "active": isOpen })}></span> <span${attr_class("svelte-qgpshq", void 0, { "active": isOpen })}></span></div></button> <nav${attr_class("sidebar svelte-qgpshq", void 0, { "open": isOpen })}><div class="logo-container svelte-qgpshq"><h1 class="logo svelte-qgpshq">Saraylo</h1> <p class="tagline svelte-qgpshq">Software Development Studio</p></div> <ul class="nav-list svelte-qgpshq"><!--[-->`);
    const each_array = ensure_array_like(navigationItems);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<li class="nav-item svelte-qgpshq"><a${attr("href", item.path)}${attr_class("nav-link svelte-qgpshq", void 0, { "active": isActive(item.path) })}><span class="nav-text">${escape_html(item.label)}</span> `);
      if (isActive(item.path)) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="active-indicator svelte-qgpshq"></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></a></li>`);
    }
    $$renderer2.push(`<!--]--></ul> <div class="sidebar-footer svelte-qgpshq"><div class="tech-stack svelte-qgpshq"><span class="tech-item svelte-qgpshq">Svelte</span> <span class="tech-item svelte-qgpshq">TypeScript</span> <span class="tech-item svelte-qgpshq">Node.js</span></div> `);
    LanguageSwitcher($$renderer2);
    $$renderer2.push(`<!----></div></nav> <main class="main-content svelte-qgpshq"><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></main> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _layout($$renderer, $$props) {
  Layout($$renderer, {
    children: ($$renderer2) => {
      $$renderer2.push(`<!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]-->`);
    },
    $$slots: { default: true }
  });
}
export {
  _layout as default
};
