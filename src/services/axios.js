import axios from "axios";

let logoutTimer;

function resetAutoLogoutTimer() {
  clearTimeout(logoutTimer);

  logoutTimer = setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }, 15 * 60 * 1000);
}

export const axiosInstance = axios.create({
  baseURL: "https://musicstore-production-1f73.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    resetAutoLogoutTimer();

    return config;
  },
  error => {
    console.error("Ошибка при отправке запроса:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const { data } = await axiosInstance.post("/Refresh", { refreshToken });

          localStorage.setItem("token", data.token);

          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return axiosInstance.request(originalRequest);
        } catch (refreshError) {
          console.error("Ошибка при обновлении токена:", refreshError);

          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      } else {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
