import { f as formatDate, g as generateId } from "./utils3.js";
let navigationStore = [
  {
    id: "nav1",
    label: "Главная",
    path: "/",
    icon: "🏠",
    order: 1,
    isActive: true,
    createdAt: formatDate(/* @__PURE__ */ new Date("2023-01-01")),
    updatedAt: formatDate(/* @__PURE__ */ new Date("2023-01-01"))
  },
  {
    id: "nav2",
    label: "Продукты",
    path: "/products",
    icon: "📦",
    order: 2,
    isActive: true,
    createdAt: formatDate(/* @__PURE__ */ new Date("2023-01-01")),
    updatedAt: formatDate(/* @__PURE__ */ new Date("2023-01-01"))
  },
  {
    id: "nav3",
    label: "О нас",
    path: "/about",
    icon: "👥",
    order: 3,
    isActive: true,
    createdAt: formatDate(/* @__PURE__ */ new Date("2023-01-01")),
    updatedAt: formatDate(/* @__PURE__ */ new Date("2023-01-01"))
  },
  {
    id: "nav4",
    label: "Контакты",
    path: "/contact",
    icon: "📞",
    order: 4,
    isActive: true,
    createdAt: formatDate(/* @__PURE__ */ new Date("2023-01-01")),
    updatedAt: formatDate(/* @__PURE__ */ new Date("2023-01-01"))
  }
];
async function getActiveNavigationItems() {
  return navigationStore.filter((item) => item.isActive).sort((a, b) => a.order - b.order);
}
async function getAllNavigationItems(limit, offset) {
  let items = [...navigationStore].sort((a, b) => a.order - b.order);
  if (limit) {
    const startIndex = offset || 0;
    items = items.slice(startIndex, startIndex + limit);
  }
  return items;
}
async function getNavigationItemById(id) {
  const item = navigationStore.find((n) => n.id === id);
  return item || null;
}
async function createNavigationItem(data) {
  const newNavItem = {
    id: generateId(),
    ...data,
    createdAt: formatDate(/* @__PURE__ */ new Date()),
    updatedAt: formatDate(/* @__PURE__ */ new Date())
  };
  navigationStore.push(newNavItem);
  return newNavItem;
}
async function deleteNavigationItem(id) {
  const index = navigationStore.findIndex((n) => n.id === id);
  if (index === -1) {
    return false;
  }
  navigationStore.splice(index, 1);
  return true;
}
async function getNavigationItemCount() {
  return navigationStore.length;
}
export {
  getNavigationItemCount as a,
  getActiveNavigationItems as b,
  createNavigationItem as c,
  deleteNavigationItem as d,
  getNavigationItemById as e,
  getAllNavigationItems as g
};
