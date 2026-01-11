import "@sveltejs/kit";
import { r as requireRole } from "../../../../../chunks/auth.js";
import { s as successResponse, h as handleError, v as validationError } from "../../../../../chunks/utils3.js";
import { i as initializeDemoBackups, b as backupStore } from "../../../../../chunks/backupService.js";
import { g as getAllProducts } from "../../../../../chunks/productService.js";
import { g as getAllTeamMembers } from "../../../../../chunks/teamService.js";
import { g as getAllNavigationItems } from "../../../../../chunks/navigationService.js";
initializeDemoBackups();
async function GET({ request }) {
  try {
    const authResult = requireRole(["admin", "editor"])(request);
    if (authResult instanceof Response) {
      return authResult;
    }
    const allBackups = backupStore.getAllBackups();
    const stats = backupStore.getStats();
    const response = {
      data: allBackups,
      stats
    };
    return successResponse(response, "Бэкапы успешно получены");
  } catch (error) {
    return handleError(error, "Ошибка при получении бэкапов");
  }
}
async function POST({ request }) {
  try {
    const authResult = requireRole(["admin"])(request);
    if (authResult instanceof Response) {
      return authResult;
    }
    const body = await request.json();
    const { description, dataTypes } = body;
    if (!dataTypes || !Array.isArray(dataTypes) || dataTypes.length === 0) {
      return validationError("Необходимо указать хотя бы один тип данных для бэкапа");
    }
    const validTypes = ["products", "team", "navigation", "settings"];
    const invalidTypes = dataTypes.filter((type) => !validTypes.includes(type));
    if (invalidTypes.length > 0) {
      return validationError(`Недопустимые типы данных: ${invalidTypes.join(", ")}`);
    }
    const backupData = {};
    let totalSize = 0;
    if (dataTypes.includes("products")) {
      try {
        const products = await getAllProducts();
        backupData.products = products;
        totalSize += Math.max(1, Math.ceil(products.length * 0.5));
      } catch (error) {
        console.error("Ошибка получения продуктов для бэкапа:", error);
        backupData.products = [];
      }
    }
    if (dataTypes.includes("team")) {
      try {
        const teamMembers = await getAllTeamMembers();
        backupData.team = teamMembers;
        totalSize += Math.max(1, Math.ceil(teamMembers.length * 0.3));
      } catch (error) {
        console.error("Ошибка получения членов команды для бэкапа:", error);
        backupData.team = [];
      }
    }
    if (dataTypes.includes("navigation")) {
      try {
        const navigationItems = await getAllNavigationItems();
        backupData.navigation = navigationItems;
        totalSize += Math.max(1, Math.ceil(navigationItems.length * 0.2));
      } catch (error) {
        console.error("Ошибка получения навигации для бэкапа:", error);
        backupData.navigation = [];
      }
    }
    const backupToAdd = {
      description: description || `Бэкап от ${(/* @__PURE__ */ new Date()).toLocaleString("ru-RU")}`,
      dataTypes,
      data: backupData,
      size: totalSize,
      status: "completed",
      version: "1.0.0",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      createdBy: "admin"
      // В production здесь будет ID пользователя
    };
    const newBackup = backupStore.addBackup(backupToAdd);
    return successResponse(newBackup, "Бэкап успешно создан");
  } catch (error) {
    return handleError(error, "Ошибка при создании бэкапа");
  }
}
export {
  GET,
  POST
};
