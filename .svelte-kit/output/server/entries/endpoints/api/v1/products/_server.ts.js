import "@sveltejs/kit";
import { g as getAllProducts, a as getProductCount, c as createProduct } from "../../../../../chunks/productService.js";
import { r as requireRole } from "../../../../../chunks/auth.js";
import { v as validationError, s as successResponse, h as handleError } from "../../../../../chunks/utils2.js";
async function GET({ url }) {
  try {
    const search = url.searchParams.get("search") || void 0;
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    if (page < 1) {
      return validationError("Номер страницы должен быть больше 0");
    }
    if (limit < 1 || limit > 100) {
      return validationError("Лимит должен быть между 1 и 100");
    }
    const offset = (page - 1) * limit;
    const products = await getAllProducts(search, limit, offset);
    const totalCount = await getProductCount();
    const totalPages = Math.ceil(totalCount / limit);
    const response = {
      data: products,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
    return successResponse(response, "Продукты успешно получены");
  } catch (error) {
    return handleError(error, "Ошибка при получении продуктов");
  }
}
async function POST({ request }) {
  try {
    const authResult = requireRole(["admin"])(request);
    if (authResult instanceof Response) {
      return authResult;
    }
    const body = await request.json();
    if (!body.name || !body.description || !body.type) {
      return validationError("Название, описание и тип обязательны");
    }
    const newProduct = await createProduct(body);
    return successResponse(newProduct, "Продукт успешно создан");
  } catch (error) {
    return handleError(error, "Ошибка при создании продукта");
  }
}
export {
  GET,
  POST
};
