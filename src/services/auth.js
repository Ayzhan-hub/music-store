import { axiosInstance } from "./axios";

// Регистрация
export async function registerUser(login, email, password) {
  try {
    const res = await api.post("/Registration", { login, password, email });

    return res.data;
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw error;
  }
}

// Авторизация
export async function loginUser(login, password) {
  try {
    const response = await axiosInstance.post("/Authorization", { login, password });
    const { token, refreshToken } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
  } catch (error) {
    console.error("Ошибка при входе:", error);
    throw error;
  }
}
