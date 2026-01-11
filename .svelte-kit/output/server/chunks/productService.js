import { p as products } from "./products.js";
import { f as formatDate, g as generateId } from "./utils2.js";
let productsStore = products.map((product) => ({
  ...product,
  releaseDate: formatDate(product.releaseDate),
  createdAt: formatDate(/* @__PURE__ */ new Date()),
  updatedAt: formatDate(/* @__PURE__ */ new Date())
}));
async function getAllProducts(search, limit, offset) {
  let filteredProducts = [...productsStore];
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) => product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm) || product.features.some((feature) => feature.toLowerCase().includes(searchTerm))
    );
  }
  if (limit) {
    const startIndex = offset || 0;
    filteredProducts = filteredProducts.slice(startIndex, startIndex + limit);
  }
  return filteredProducts;
}
async function getProductById(id) {
  const product = productsStore.find((p) => p.id === id);
  return product || null;
}
async function createProduct(data) {
  const newProduct = {
    id: generateId(),
    ...data,
    releaseDate: data.releaseDate,
    createdAt: formatDate(/* @__PURE__ */ new Date()),
    updatedAt: formatDate(/* @__PURE__ */ new Date())
  };
  productsStore.push(newProduct);
  return newProduct;
}
async function updateProduct(id, data) {
  const index = productsStore.findIndex((p) => p.id === id);
  if (index === -1) {
    return null;
  }
  const updatedProduct = {
    ...productsStore[index],
    ...data,
    updatedAt: formatDate(/* @__PURE__ */ new Date())
  };
  productsStore[index] = updatedProduct;
  return updatedProduct;
}
async function deleteProduct(id) {
  const index = productsStore.findIndex((p) => p.id === id);
  if (index === -1) {
    return false;
  }
  productsStore.splice(index, 1);
  return true;
}
async function getProductCount() {
  return productsStore.length;
}
export {
  getProductCount as a,
  getProductById as b,
  createProduct as c,
  deleteProduct as d,
  getAllProducts as g,
  updateProduct as u
};
