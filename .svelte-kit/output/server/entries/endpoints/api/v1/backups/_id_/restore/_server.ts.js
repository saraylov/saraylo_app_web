import "@sveltejs/kit";
import { r as requireRole } from "../../../../../../../chunks/auth.js";
import { n as notFoundError, v as validationError, h as handleError, s as successResponse } from "../../../../../../../chunks/utils2.js";
import { b as backupStore } from "../../../../../../../chunks/backupService.js";
import { c as createProduct, g as getAllProducts, d as deleteProduct } from "../../../../../../../chunks/productService.js";
import { c as createTeamMember, g as getAllTeamMembers, d as deleteTeamMember } from "../../../../../../../chunks/teamService.js";
import { c as createNavigationItem, g as getAllNavigationItems, d as deleteNavigationItem } from "../../../../../../../chunks/navigationService.js";
async function clearCurrentData(dataType) {
  switch (dataType) {
    case "products":
      const currentProducts = await getAllProducts();
      for (const product of currentProducts) {
        await deleteProduct(product.id);
      }
      break;
    case "team":
      const currentTeam = await getAllTeamMembers();
      for (const member of currentTeam) {
        await deleteTeamMember(member.id);
      }
      break;
    case "navigation":
      const currentNav = await getAllNavigationItems();
      for (const navItem of currentNav) {
        await deleteNavigationItem(navItem.id);
      }
      break;
  }
}
async function restoreProducts(productsData) {
  let restoredCount = 0;
  await clearCurrentData("products");
  for (const productData of productsData) {
    try {
      const createData = {
        name: productData.name,
        description: productData.description,
        type: productData.type || "desktop",
        icon: productData.icon || "📦",
        images: productData.images || [],
        features: productData.features || [],
        technologies: productData.technologies || [],
        link: productData.link,
        releaseDate: productData.releaseDate
      };
      await createProduct(createData);
      restoredCount++;
    } catch (error) {
      console.error(`Ошибка восстановления продукта ${productData.id}:`, error);
    }
  }
  return restoredCount;
}
async function restoreTeamMembers(teamData) {
  console.log(`Начинаем восстановление ${teamData.length} членов команды`);
  let restoredCount = 0;
  console.log("Очистка текущей команды...");
  await clearCurrentData("team");
  console.log("Восстановление членов команды из бэкапа...");
  for (const memberData of teamData) {
    try {
      console.log(`Восстановление члена команды: ${memberData.name} (${memberData.id})`);
      const createData = {
        name: memberData.name,
        role: memberData.role,
        bio: memberData.bio,
        avatar: memberData.avatar,
        skills: memberData.skills || []
      };
      await createTeamMember(createData);
      restoredCount++;
      console.log(`✅ Успешно восстановлен: ${memberData.name}`);
    } catch (error) {
      console.error(`❌ Ошибка восстановления члена команды ${memberData.id}:`, error);
    }
  }
  console.log(`Всего восстановлено: ${restoredCount} из ${teamData.length}`);
  return restoredCount;
}
async function restoreNavigation(navData) {
  let restoredCount = 0;
  await clearCurrentData("navigation");
  for (const navItemData of navData) {
    try {
      const createData = {
        label: navItemData.label,
        path: navItemData.path,
        icon: navItemData.icon,
        order: navItemData.order,
        isActive: navItemData.isActive !== void 0 ? navItemData.isActive : true
      };
      await createNavigationItem(createData);
      restoredCount++;
    } catch (error) {
      console.error(`Ошибка восстановления элемента навигации ${navItemData.id}:`, error);
    }
  }
  return restoredCount;
}
async function restoreDataFromBackup(backupId, restoreDataTypes) {
  try {
    const backup = backupStore.getBackupById(backupId);
    if (!backup) {
      throw new Error("Бэкап не найден");
    }
    const dataTypesToRestore = restoreDataTypes || backup.dataTypes;
    const validTypes = dataTypesToRestore.filter(
      (type) => ["products", "team", "navigation"].includes(type)
    );
    if (validTypes.length === 0) {
      throw new Error("Нет допустимых типов данных для восстановления");
    }
    const result = {
      success: true,
      restoredItems: {},
      errors: [],
      message: ""
    };
    for (const dataType of validTypes) {
      try {
        let restoredCount = 0;
        switch (dataType) {
          case "products":
            restoredCount = await restoreProducts(backup.data.products || []);
            result.restoredItems.products = restoredCount;
            break;
          case "team":
            restoredCount = await restoreTeamMembers(backup.data.team || []);
            result.restoredItems.team = restoredCount;
            break;
          case "navigation":
            restoredCount = await restoreNavigation(backup.data.navigation || []);
            result.restoredItems.navigation = restoredCount;
            break;
        }
        console.log(`✅ Восстановлено ${restoredCount} элементов типа ${dataType}`);
      } catch (error) {
        const errorMsg = `Ошибка восстановления ${dataType}: ${error.message}`;
        result.errors.push(errorMsg);
        console.error(errorMsg);
      }
    }
    const totalRestored = Object.values(result.restoredItems).reduce((sum, count) => sum + (count || 0), 0);
    if (result.errors.length > 0) {
      result.success = false;
      result.message = `Частично восстановлено ${totalRestored} элементов. Ошибки: ${result.errors.join("; ")}`;
    } else {
      result.message = `Успешно восстановлено ${totalRestored} элементов`;
    }
    return result;
  } catch (error) {
    return {
      success: false,
      restoredItems: {},
      errors: [error.message],
      message: `Ошибка восстановления: ${error.message}`
    };
  }
}
async function POST({ params, request }) {
  try {
    const authResult = requireRole(["admin"])(request);
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
    let body = {};
    try {
      body = await request.json();
    } catch (e) {
    }
    const restoreDataTypes = body.restoreDataTypes || backup.dataTypes;
    const validRestoreTypes = restoreDataTypes.filter(
      (type) => backup.dataTypes.includes(type)
    );
    if (validRestoreTypes.length === 0) {
      return validationError("Нет допустимых типов данных для восстановления");
    }
    const restoreResult = await restoreDataFromBackup(id, validRestoreTypes);
    if (!restoreResult.success) {
      return handleError(new Error(restoreResult.message), "Ошибка при восстановлении данных");
    }
    const restoreRecord = {
      restoredAt: (/* @__PURE__ */ new Date()).toISOString(),
      restoredBy: "admin",
      // В production здесь будет ID пользователя
      restoredDataTypes: validRestoreTypes,
      restoreId: `restore_${Date.now()}`,
      restoredItems: restoreResult.restoredItems
    };
    const updatedBackup = backupStore.updateBackup(id, {
      restoreHistory: [...backup.restoreHistory || [], restoreRecord],
      restoreCount: (backup.restoreCount || 0) + 1,
      lastRestoredAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    const responseResult = {
      backupId: updatedBackup.id,
      restoredDataTypes: validRestoreTypes,
      restoredItems: restoreResult.restoredItems,
      restoreTime: (/* @__PURE__ */ new Date()).toISOString(),
      message: restoreResult.message
    };
    return successResponse(responseResult, "Данные успешно восстановлены из бэкапа");
  } catch (error) {
    return handleError(error, "Ошибка при восстановлении данных из бэкапа");
  }
}
export {
  POST
};
