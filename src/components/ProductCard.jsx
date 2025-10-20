import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../redux/slices/basketItemSlice";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basketItem = useSelector(state => state.basketItem);

  const isInBasket = basketItem?.some(item => item === product.id) || false;

  async function fetchBasketAddItem() {
    let guest = localStorage.getItem("Guest");
    if (!guest) {
      console.error("Guest не найден в localStorage");
      return;
    }
    try {
      await axiosInstance.get("/BasketAddItem", {
        params: {
          ProductId: product.id,
          GuestId: guest,
        },
      });
      dispatch(addItem(product.id));
      console.log("Товар добавлен в корзину");
    } catch (err) {
      console.error("Ошибка добавить в корзину:", err);
      setError("Не удалось добавить в корзину");
    }
  }

  const handleGoToCart = () => {
    navigate("/cart"); // переход на страницу корзины
  };

  return (
    <div className="product-card">
      <div className="product-img-grid">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="product-card__img"
        />
      </div>
      <div>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">{product.price} ₸</p>

        {!isInBasket ? (
          <button className="product-card__button" onClick={fetchBasketAddItem}>
            "Добавить в корзину 🛒"
          </button>
        ) : (
          <button className="product-card__button" onClick={handleGoToCart}>
            "В корзине 🛒"
          </button>
        )}
      </div>
    </div>
  );
}
