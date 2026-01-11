import "@sveltejs/kit";
import { g as getAllTeamMembers, a as getTeamMemberCount, c as createTeamMember } from "../../../../../chunks/teamService.js";
import { r as requireRole } from "../../../../../chunks/auth.js";
import { v as validationError, s as successResponse, h as handleError } from "../../../../../chunks/utils2.js";
async function GET({ url }) {
  try {
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    if (page < 1) {
      return validationError("Номер страницы должен быть больше 0");
    }
    if (limit < 1 || limit > 100) {
      return validationError("Лимит должен быть между 1 и 100");
    }
    const offset = (page - 1) * limit;
    const teamMembers = await getAllTeamMembers(limit, offset);
    const totalCount = await getTeamMemberCount();
    const totalPages = Math.ceil(totalCount / limit);
    const response = {
      data: teamMembers,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
    return successResponse(response, "Члены команды успешно получены");
  } catch (error) {
    return handleError(error, "Ошибка при получении членов команды");
  }
}
async function POST({ request }) {
  try {
    const authResult = requireRole(["admin"])(request);
    if (authResult instanceof Response) {
      return authResult;
    }
    const body = await request.json();
    if (!body.name || !body.role || !body.bio) {
      return validationError("Имя, роль и биография обязательны");
    }
    const newMember = await createTeamMember(body);
    return successResponse(newMember, "Член команды успешно создан");
  } catch (error) {
    return handleError(error, "Ошибка при создании члена команды");
  }
}
export {
  GET,
  POST
};
