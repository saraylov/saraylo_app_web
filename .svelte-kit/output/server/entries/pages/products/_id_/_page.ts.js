import { error } from "@sveltejs/kit";
import { p as products } from "../../../../chunks/products.js";
async function load({ params }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    throw error(404, "Product not found");
  }
  return {
    product
  };
}
export {
  load
};
