import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function useAutoLogout(timeout = 15 * 60 * 1000) {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) return;

    let logoutTimer;

    const handleLogout = () => {
      console.warn("Автоматический выход — бездействие пользователя");

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      navigate("/");
    };

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(handleLogout, timeout);
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(logoutTimer);
    };
  }, [navigate, setIsLoggedIn, timeout]);
}
