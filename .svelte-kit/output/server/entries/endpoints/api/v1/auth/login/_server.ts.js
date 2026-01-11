import "@sveltejs/kit";
import { a as authenticateUser, g as generateToken } from "../../../../../../chunks/auth.js";
import { v as validationError, s as successResponse, h as handleError } from "../../../../../../chunks/utils3.js";
async function POST({ request }) {
  try {
    const body = await request.json();
    if (!body.email || !body.password) {
      return validationError("Email и пароль обязательны");
    }
    const user = await authenticateUser({
      email: body.email,
      password: body.password
    });
    if (!user) {
      return validationError("Неверный email или пароль");
    }
    const token = generateToken(user);
    const response = {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      expiresIn: 24 * 60 * 60
      // 24 часа в секундах
    };
    return successResponse(response, "Успешная аутентификация");
  } catch (error) {
    return handleError(error, "Ошибка при аутентификации");
  }
}
export {
  POST
};
