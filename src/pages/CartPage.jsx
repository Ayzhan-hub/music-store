import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

export default function CartPage() {
  const [error, setError] = useState(null);
  const [basketItems, setbasketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const totalPrice = basketItems.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    async function fetchBasketGetItem() {
      let guest = localStorage.getItem("Guest");
      if (!guest) {
        console.error("Guest не найден в localStorage");
        return;
      }
      try {
        const { data } = await axiosInstance.get("GetBasket", {
          params: {
            GuestId: guest,
          },
        });
        setbasketItems(data);
        console.log(data);
      } catch (err) {
        console.error("Ошибка добавить в корзину:", err);
        setError("Не удалось добавить в корзину");
      } finally {
        setLoading(false);
      }
    }

    fetchBasketGetItem();
  }, []);

  const handleGoToLogin = () => {
    navigate("/login"); // переход на страницу корзины
  };
  return (
    <>
      <Header />
      <div className="cart-page">
        <h1 className="cart-page__title">Корзина</h1>
        {loading && <Loader />}
        {basketItems.length === 0 ? (
          <p className="cart-page__empty">Ваша корзина пуста.</p>
        ) : (
          <>
            <div className="cart-page__list">
              {basketItems.map((item, index) => (
                <div className="cart-page__item" key={index}>
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="cart-page__img"
                  />
                  <div className="cart-page__info">
                    <h3 className="cart-page__name">{item.name}</h3>
                    <p className="cart-page__price">{item.price} ₸</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-page__footer">
              <p className="cart-page__total">Итого: {totalPrice} ₸</p>
              <button className="cart-page__checkout" onClick={handleGoToLogin}>
                Перейти к оформлению заказа
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
