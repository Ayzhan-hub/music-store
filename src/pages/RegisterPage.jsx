import { useState, useEffect } from "react";
import { registerUser } from "../services/auth.js";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
function RegisterPage() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(login, email, password);
      const response = await registerUser(login, email, password);
      if (response.status === 200 || response.status === 201) {
        setMessage("Регистрация прошла успешно! Переход на страницу входа...");
        setIsError(false);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setMessage(response.data?.details || "Ошибка при регистрации");
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setMessage("Ошибка соединения с сервером.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="register">
        {/* Сообщение об успехе или ошибке */}
        {message && (
          <p className={`register__message ${isError ? "error" : "success"}`}>{message}</p>
        )}
        <h1 className="register__title">Регистрация</h1>
        <form className="register__form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Логин"
            className="register__input"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            className="register__input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Пароль"
            required
            autoComplete="new-password"
            className="register__input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="register__button" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Создание...
              </>
            ) : (
              "Создать аккаунт"
            )}
          </button>
        </form>

        <p className="register__text">
          Уже есть аккаунт?{" "}
          <a href="/login" className="register__link">
            Войти
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default RegisterPage;
