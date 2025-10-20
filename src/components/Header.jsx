import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import logo from "../assets/img/logo.png";
import { FiShoppingCart } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="BangStore" className="header__logo-img" />
          </Link>
        </div>

        <nav className="header__nav">
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/products">Инструменты</Link>
            </li>
            <li>
              <Link to="/about">О Нас</Link>
            </li>
            <li>
              <Link to="/contacts">Контакты</Link>
            </li>
          </ul>
        </nav>

        <div className="header__search">
          <input type="text" placeholder="Поиск..." />
          <button className="header__search-btn">
            <FiSearch />
          </button>
        </div>

        <div className="header__icons">
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="register-link">
                Зарегистрироваться
              </Link>
              <Link to="/login" className="login-link">
                Войти
              </Link>
            </>
          ) : (
            <div className="header__profile">
              <button className="header__avatar" onClick={() => setMenuOpen(prev => !prev)}>
                👤
              </button>

              {menuOpen && (
                <div className="header__dropdown">
                  <Link to="/profile">Мой аккаунт</Link>
                  <button onClick={handleLogout}>Выйти</button>
                </div>
              )}
            </div>
          )}
          <Link to="/cart" className="header__cart">
            <FiShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
