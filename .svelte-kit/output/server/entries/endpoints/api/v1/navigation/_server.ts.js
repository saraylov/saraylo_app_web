import "@sveltejs/kit";
import { g as getAllNavigationItems, a as getNavigationItemCount, b as getActiveNavigationItems } from "../../../../../chunks/navigationService.js";
import { v as validationError, s as successResponse, h as handleError } from "../../../../../chunks/utils3.js";
async function GET({ url }) {
  try {
    const showAll = url.searchParams.get("showAll") === "true";
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    if (page < 1) {
      return validationError("Номер страницы должен быть больше 0");
    }
    if (limit < 1 || limit > 100) {
      return validationError("Лимит должен быть между 1 и 100");
    }
    const offset = (page - 1) * limit;
    let navigationItems;
    let totalCount;
    if (showAll) {
      navigationItems = await getAllNavigationItems(limit, offset);
      totalCount = await getNavigationItemCount();
    } else {
      navigationItems = await getActiveNavigationItems();
      totalCount = navigationItems.length;
    }
    const totalPages = Math.ceil(totalCount / limit);
    const response = {
      data: navigationItems,
      pagination: showAll ? {
        page,
        limit,
        total: totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      } : void 0
    };
    const message = showAll ? "Все элементы навигации успешно получены" : "Активные элементы навигации успешно получены";
    return successResponse(response, message);
  } catch (error) {
    return handleError(error, "Ошибка при получении элементов навигации");
  }
}
export {
  GET
};
