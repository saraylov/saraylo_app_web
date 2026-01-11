import "@sveltejs/kit";
import { b as getTeamMemberById, d as deleteTeamMember } from "../../../../../../chunks/teamService.js";
import { r as requireRole } from "../../../../../../chunks/auth.js";
import { n as notFoundError, s as successResponse, h as handleError } from "../../../../../../chunks/utils2.js";
async function GET({ params }) {
  try {
    const { id } = params;
    if (!id) {
      return notFoundError("ID члена команды обязателен");
    }
    const teamMember = await getTeamMemberById(id);
    if (!teamMember) {
      return notFoundError("Член команды не найден");
    }
    return successResponse(teamMember, "Член команды успешно получен");
  } catch (error) {
    return handleError(error, "Ошибка при получении члена команды");
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
      return notFoundError("ID члена команды обязателен");
    }
    const deleted = await deleteTeamMember(id);
    if (!deleted) {
      return notFoundError("Член команды не найден");
    }
    return successResponse(null, "Член команды успешно удален");
  } catch (error) {
    return handleError(error, "Ошибка при удалении члена команды");
  }
}
export {
  DELETE,
  GET
};
