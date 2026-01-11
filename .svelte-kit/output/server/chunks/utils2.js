import { json } from "@sveltejs/kit";
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
function formatDate(date) {
  return date.toISOString();
}
function handleError(error, message = "Internal server error") {
  console.error("API Error:", error);
  return json({
    success: false,
    error: message,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  }, { status: 500 });
}
function successResponse(data, message = "Success") {
  return json({
    success: true,
    data,
    message,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
}
function validationError(message, details) {
  return json({
    success: false,
    error: "Validation error",
    message,
    details,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  }, { status: 400 });
}
function unauthorizedError(message = "Unauthorized") {
  return json({
    success: false,
    error: "Unauthorized",
    message,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  }, { status: 401 });
}
function forbiddenError(message = "Forbidden") {
  return json({
    success: false,
    error: "Forbidden",
    message,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  }, { status: 403 });
}
function notFoundError(message = "Resource not found") {
  return json({
    success: false,
    error: "Not found",
    message,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  }, { status: 404 });
}
export {
  forbiddenError as a,
  formatDate as f,
  generateId as g,
  handleError as h,
  notFoundError as n,
  successResponse as s,
  unauthorizedError as u,
  validationError as v
};
