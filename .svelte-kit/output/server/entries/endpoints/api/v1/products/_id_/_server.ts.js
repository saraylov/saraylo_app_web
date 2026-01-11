import "@sveltejs/kit";
import { b as getProductById, u as updateProduct, d as deleteProduct } from "../../../../../../chunks/productService.js";
import { r as requireRole } from "../../../../../../chunks/auth.js";
import { n as notFoundError, s as successResponse, h as handleError } from "../../../../../../chunks/utils2.js";
async function GET({ params }) {
  try {
    const { id } = params;
    if (!id) {
      return notFoundError("ID продукта обязателен");
    }
    const product = await getProductById(id);
    if (!product) {
      return notFoundError("Продукт не найден");
    }
    return successResponse(product, "Продукт успешно получен");
  } catch (error) {
    return handleError(error, "Ошибка при получении продукта");
  }
}
async function PUT({ request, params }) {
  try {
    const authResult = requireRole(["admin", "editor"])(request);
    if (authResult instanceof Response) {
      return authResult;
    }
    const { id } = params;
    if (!id) {
      return notFoundError("ID продукта обязателен");
    }
    const body = await request.json();
    const updatedProduct = await updateProduct(id, body);
    if (!updatedProduct) {
      return notFoundError("Продукт не найден");
    }
    return successResponse(updatedProduct, "Продукт успешно обновлен");
  } catch (error) {
    return handleError(error, "Ошибка при обновлении продукта");
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
  DELETE,
  GET,
  PUT
};
