import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios";
import { useSelector, useDispatch } from "react-redux";
import { setCategories } from "../redux/slices/categoriesSlice";
import { setPickCategories } from "../redux/slices/pickCategoryHomePageSlice";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

function HomeCategories() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axiosInstance.get("/GetDictionaryType");
        dispatch(setCategories(data));
      } catch (err) {
        console.error("Ошибка загрузки инструментов:", err);
        setError("Не удалось загрузить инструменты");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  function pickCategory(params) {
    dispatch(setPickCategories(params));
  }

  return (
    <section className="categories">
      <h2 className="categories__title">Категории товаров</h2>
      {loading && <Loader />}
      <div className="categories__list">
        {categories.map((item, index) => (
          <div className="category-card-wrapper">
            <Link
              to={`/products`}
              onClick={() => pickCategory(item.type)}
              key={index}
              className="category-card-home"
            >
              <img
                src={item.image || "/placeholder.png"}
                alt={item.type}
                className="category-card__img"
              />
              <div className="category-card__overlay">
                <h3 className="category-card__title">{item.type}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeCategories;
