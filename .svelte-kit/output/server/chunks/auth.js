import { a as forbiddenError, u as unauthorizedError } from "./utils3.js";
const JWT_SECRET = "your-secret-key-change-in-production";
const mockUsers = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    // В production хранить хэши паролей
    name: "Администратор",
    role: "admin"
  },
  {
    id: "2",
    email: "editor@example.com",
    password: "editor123",
    name: "Редактор",
    role: "editor"
  }
];
async function authenticateUser(credentials) {
  const user = mockUsers.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
}
function generateToken(user) {
  const timestamp = Date.now();
  const signature = btoa(`${user.id}:${timestamp}:${JWT_SECRET}`).slice(0, 32);
  return `${user.id}:${timestamp}:${signature}`;
}
function verifyToken(token) {
  try {
    const parts = token.split(":");
    if (parts.length !== 3) return null;
    const [userId, timestampStr, signature] = parts;
    const timestamp = parseInt(timestampStr);
    if (Date.now() - timestamp > 24 * 60 * 60 * 1e3) {
      return null;
    }
    const expectedSignature = btoa(`${userId}:${timestamp}:${JWT_SECRET}`).slice(0, 32);
    if (signature !== expectedSignature) {
      return null;
    }
    const user = getUserById(userId);
    if (!user) return null;
    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(timestamp / 1e3),
      exp: Math.floor((timestamp + 24 * 60 * 60 * 1e3) / 1e3)
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
function requireAuth(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return unauthorizedError("Требуется токен авторизации");
  }
  const token = authHeader.substring(7);
  const payload = verifyToken(token);
  if (!payload) {
    return unauthorizedError("Неверный или просроченный токен");
  }
  return payload;
}
function requireRole(requiredRoles) {
  return function(request) {
    const authResult = requireAuth(request);
    if (authResult instanceof Response) {
      return authResult;
    }
    const user = authResult;
    if (!requiredRoles.includes(user.role)) {
      return forbiddenError(`Требуются права: ${requiredRoles.join(", ")}`);
    }
    return user;
  };
}
function getUserById(id) {
  const user = mockUsers.find((u) => u.id === id);
  if (!user) {
    return void 0;
  }
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
}
export {
  authenticateUser as a,
  generateToken as g,
  requireRole as r
};
