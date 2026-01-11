import "@sveltejs/kit";
import { d as deleteTeamMember } from "../../../../../../../chunks/teamService.js";
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
  DELETE
};
