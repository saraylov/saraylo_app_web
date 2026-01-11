import { x as attr_class, y as attr, G as bind_props } from "../../../chunks/index2.js";
import { t } from "../../../chunks/index3.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const prerender = true;
    let isVisible = false;
    let formData = { name: "", email: "", subject: "", message: "" };
    let isSubmitting = false;
    let submitSuccess = false;
    $$renderer2.push(`<div class="contact-page svelte-1bv7ezn"><section class="hero-section svelte-1bv7ezn"><div class="container"><div${attr_class("hero-content svelte-1bv7ezn", void 0, { "visible": isVisible })}><h1 class="page-title svelte-1bv7ezn">${escape_html(t("contact.title"))}</h1> <p class="page-subtitle svelte-1bv7ezn">${escape_html(t("contact.subtitle"))}</p></div></div></section> <section class="contact-section svelte-1bv7ezn"><div class="container"><div${attr_class("contact-content svelte-1bv7ezn", void 0, { "visible": isVisible })}><div class="contact-grid svelte-1bv7ezn"><div class="contact-info"><h2 class="section-title svelte-1bv7ezn">Contact Information</h2> <div class="info-cards svelte-1bv7ezn"><div class="info-card svelte-1bv7ezn"><div class="info-icon svelte-1bv7ezn">📧</div> <div class="info-content svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">${escape_html(t("contact.email"))}</h3> <p class="svelte-1bv7ezn">saraylo@yandex.ru</p></div></div> <div class="info-card svelte-1bv7ezn"><div class="info-icon svelte-1bv7ezn">🌐</div> <div class="info-content svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">${escape_html(t("contact.website"))}</h3> <p class="svelte-1bv7ezn">qoder.dev</p></div></div> <div class="info-card svelte-1bv7ezn"><div class="info-icon svelte-1bv7ezn">📍</div> <div class="info-content svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">${escape_html(t("contact.location"))}</h3> <p class="svelte-1bv7ezn">${escape_html(t("Russia - best country of World"))}</p></div></div> <div class="info-card svelte-1bv7ezn"><div class="info-icon svelte-1bv7ezn">🕒</div> <div class="info-content svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">${escape_html(t("contact.response_time"))}</h3> <p class="svelte-1bv7ezn">${escape_html(t("contact.response_within_24"))}</p></div></div></div> <div class="social-links svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">${escape_html(t("contact.connect_with_us"))}</h3> <div class="social-icons svelte-1bv7ezn"><a href="#" class="social-link svelte-1bv7ezn">GitHub</a> <a href="#" class="social-link svelte-1bv7ezn">Twitter</a> <a href="#" class="social-link svelte-1bv7ezn">LinkedIn</a></div></div></div> <div class="contact-form-container"><h2 class="section-title svelte-1bv7ezn">${escape_html(t("contact.send_message"))}</h2> <form class="contact-form svelte-1bv7ezn"><div class="form-group svelte-1bv7ezn"><label for="name" class="svelte-1bv7ezn">${escape_html(t("contact.name"))}</label> <input id="name" type="text"${attr("placeholder", t("contact.name_placeholder"))}${attr("value", formData.name)} required class="form-input svelte-1bv7ezn"/></div> <div class="form-group svelte-1bv7ezn"><label for="email" class="svelte-1bv7ezn">Email</label> <input id="email" type="email" placeholder="your.email@example.com"${attr("value", formData.email)} required class="form-input svelte-1bv7ezn"/></div> <div class="form-group svelte-1bv7ezn"><label for="subject" class="svelte-1bv7ezn">${escape_html(t("contact.subject"))}</label> <input id="subject" type="text"${attr("placeholder", t("contact.subject_placeholder"))}${attr("value", formData.subject)} required class="form-input svelte-1bv7ezn"/></div> <div class="form-group svelte-1bv7ezn"><label for="message" class="svelte-1bv7ezn">${escape_html(t("contact.message"))}</label> <textarea id="message"${attr("placeholder", t("contact.message_placeholder"))} required rows="6" class="form-input svelte-1bv7ezn">`);
    const $$body = escape_html(formData.message);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <button type="submit"${attr_class("submit-button svelte-1bv7ezn", void 0, { "loading": isSubmitting, "success": submitSuccess })}${attr("disabled", isSubmitting, true)}>`);
    {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`${escape_html(t("contact.send_button"))}`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></button></form></div></div></div></div></section> <section class="response-time-section svelte-1bv7ezn"><div class="container"><div${attr_class("response-content svelte-1bv7ezn", void 0, { "visible": isVisible })}><div class="response-card svelte-1bv7ezn"><h2 class="svelte-1bv7ezn">What to Expect</h2> <div class="expectations svelte-1bv7ezn"><div class="expectation-item svelte-1bv7ezn"><span class="expectation-number svelte-1bv7ezn">1</span> <div class="expectation-text svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Quick Acknowledgment</h3> <p class="svelte-1bv7ezn">We'll confirm receipt of your message within 2 hours</p></div></div> <div class="expectation-item svelte-1bv7ezn"><span class="expectation-number svelte-1bv7ezn">2</span> <div class="expectation-text svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Detailed Response</h3> <p class="svelte-1bv7ezn">Comprehensive reply with next steps within 24 hours</p></div></div> <div class="expectation-item svelte-1bv7ezn"><span class="expectation-number svelte-1bv7ezn">3</span> <div class="expectation-text svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Project Discussion</h3> <p class="svelte-1bv7ezn">Schedule a call to discuss requirements and timeline</p></div></div></div></div></div></div></section></div>`);
    bind_props($$props, { prerender });
  });
}
export {
  _page as default
};
