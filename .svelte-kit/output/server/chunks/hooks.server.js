import { sequence } from "@sveltejs/kit/hooks";
const SUPPORTED_LOCALES = ["en", "ru"];
const getLocale = (request) => {
  const header = request.headers.get("accept-language");
  if (header) {
    const locale = header.split(",")[0]?.split("-")[0];
    if (locale && SUPPORTED_LOCALES.includes(locale)) {
      return locale;
    }
  }
  return "en";
};
const localizationHandle = async ({ event, resolve }) => {
  const locale = getLocale(event.request);
  event.locals.locale = locale;
  const response = await resolve(event, {
    transformPageChunk: ({ html }) => {
      return html.replace("%lang%", locale);
    }
  });
  return response;
};
const handle = sequence(localizationHandle);
export {
  handle
};
