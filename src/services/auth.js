import { axiosInstance } from "./axios";

// Регистрация
export async function registerUser(login, email, password) {
  try {
    const guestId = localStorage.getItem("Guest");

    if (guestId == null) {
      throw "Перезагрузите страницу";
    }

    const res = await axiosInstance.post("/Registration", { guestId, login, password, email });
    console.log(res);

    return res;
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw error;
  }
}

// Авторизация
export async function loginUser(login, password) {
  try {
    const guestId = localStorage.getItem("Guest");

    if (guestId == null) {
      throw "Перезагрузите страницу";
    }

    const response = await axiosInstance.post("/Authorization", { guestId, login, password });
    const { token, refreshToken } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
  } catch (error) {
    console.error("Ошибка при входе:", error);
    throw error;
  }
}
