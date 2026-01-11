import "@sveltejs/kit";
import { d as deleteProduct } from "../../../../../../../chunks/productService.js";
import { r as requireRole } from "../../../../../../../chunks/auth.js";
import { n as notFoundError, s as successResponse, h as handleError } from "../../../../../../../chunks/utils2.js";
async function DELETE({ request, params }) {
  try {
    const authResult = requireRole(["admin"])(request);
    if (authResult instanceof Response) {
      return authResult;
    }
    const { id } = params;
    if (!id) {
      return notFoundError("ID продукта обязателен");
    }
    const deleted = await deleteProduct(id);
    if (!deleted) {
      return notFoundError("Продукт не найден");
    }
    return successResponse(null, "Продукт успешно удален");
  } catch (error) {
    return handleError(error, "Ошибка при удалении продукта");
  }
}
export {
  DELETE
};
