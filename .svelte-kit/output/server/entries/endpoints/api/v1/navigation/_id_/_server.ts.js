import "@sveltejs/kit";
import { e as getNavigationItemById, d as deleteNavigationItem } from "../../../../../../chunks/navigationService.js";
import { r as requireRole } from "../../../../../../chunks/auth.js";
import { n as notFoundError, s as successResponse, h as handleError } from "../../../../../../chunks/utils2.js";
async function GET({ params }) {
  try {
    const { id } = params;
    if (!id) {
      return notFoundError("ID элемента навигации обязателен");
    }
    const navigationItem = await getNavigationItemById(id);
    if (!navigationItem) {
      return notFoundError("Элемент навигации не найден");
    }
    return successResponse(navigationItem, "Элемент навигации успешно получен");
  } catch (error) {
    return handleError(error, "Ошибка при получении элемента навигации");
  }
}
async function DELETE({ request, params }) {
  try {
    const authResult = requireRole(["admin"])(request);
    if (authResult instanceof Response) {
      return authResult;
    }
    const { id } = params;
    if (!id) {
      return notFoundError("ID элемента навигации обязателен");
    }
    const deleted = await deleteNavigationItem(id);
    if (!deleted) {
      return notFoundError("Элемент навигации не найден");
    }
    return successResponse(null, "Элемент навигации успешно удален");
  } catch (error) {
    return handleError(error, "Ошибка при удалении элемента навигации");
  }
}
export {
  DELETE,
  GET
};
