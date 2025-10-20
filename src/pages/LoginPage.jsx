import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginPage({ onClose }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = await loginUser(login, password);
      console.log("Вход успешен:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setMessage("Вход выполнен успешно!");
      setIsError(false);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Ошибка входа:", error);
      setMessage("Ошибка при авторизации.");
      setIsError(true);
    }
  };

  return (
    <>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <h2>Вход</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Имя пользователя"
              value={login}
              onChange={e => setLogin(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit">Войти</button>
            <p className="register-text">
              Нет аккаунта? <a href="/register">Регистрация</a>
            </p>
          </form>
          {message && (
            <p className={`login__message ${isError ? "error" : "success"}`}>{message}</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
