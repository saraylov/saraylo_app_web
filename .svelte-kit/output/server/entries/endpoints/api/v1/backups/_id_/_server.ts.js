import "@sveltejs/kit";
import { r as requireRole } from "../../../../../../chunks/auth.js";
import { n as notFoundError, s as successResponse, h as handleError } from "../../../../../../chunks/utils2.js";
import { b as backupStore } from "../../../../../../chunks/backupService.js";
async function GET({ params, request }) {
  try {
    const authResult = requireRole(["admin", "editor"])(request);
    if (authResult instanceof Response) {
      return authResult;
    }
    const { id } = params;
    if (!id) {
      return notFoundError("ID бэкапа обязателен");
    }
    const backup = backupStore.getBackupById(id);
    if (!backup) {
      return notFoundError("Бэкап не найден");
    }
    return successResponse(backup, "Бэкап успешно получен");
  } catch (error) {
    return handleError(error, "Ошибка при получении бэкапа");
  }
}
async function DELETE({ params, request }) {
  try {
    const authResult = requireRole(["admin"])(request);
    if (authResult instanceof Response) {
      return authResult;
    }
    const { id } = params;
    if (!id) {
      return notFoundError("ID бэкапа обязателен");
    }
    const deletedBackup = backupStore.deleteBackup(id);
    if (!deletedBackup) {
      return notFoundError("Бэкап не найден");
    }
    return successResponse(deletedBackup, "Бэкап успешно удален");
  } catch (error) {
    return handleError(error, "Ошибка при удалении бэкапа");
  }
}
export {
  DELETE,
  GET
};
