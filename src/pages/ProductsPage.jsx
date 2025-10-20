import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from "react-redux";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const pickCategoryHomePage = useSelector(state => state.pickCategoryHomePage);

  async function fetchProducts(page, type, sort) {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/Products", { page, type, sort });
      setProducts(data.products);
      setPage(page);
      setTotalPages(data.totalPages);
      setSelectedCategory(type);
    } catch (err) {
      console.error("Ошибка загрузки инструментов:", err);
      setError("Не удалось загрузить инструменты");
    } finally {
      setLoading(false);
    }
  }

  async function fetchGuest() {
    try {
      const { data } = await axiosInstance.get("/Guest");
      localStorage.setItem("Guest", data);
    } catch (err) {
      console.error("Ошибка загрузки инструментов:", err);
      setError("Не удалось загрузить инструменты");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let guest = localStorage.getItem("Guest");
    if (guest === null) {
      fetchGuest();
    }

    fetchProducts(1, pickCategoryHomePage, true);
  }, []);

  return (
    <>
      <Header />

      <main className="products">
        <h1 className="products__title">Музыкальные инструменты</h1>
        <div className="product-content">
          <aside className="product-menu">
            <h3>Категории</h3>
            <ul>
              <li>
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault(); // предотвращаем переход по ссылке
                    fetchProducts(1, "", true); // вызываем запрос на бэкенд
                  }}
                >
                  Все
                </a>
              </li>
              {categories.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault(); // предотвращаем переход по ссылке
                      fetchProducts(1, item.type, true); // вызываем запрос на бэкенд
                    }}
                  >
                    {item.type}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <section className="product-main">
            {loading && <Loader />}
            {error && <p className="products__error">{error}</p>}

            {!loading && !error && (
              <div className="products__list">
                <div className="products__grid">
                  {products.map((item, index) => (
                    <ProductCard key={index} product={item} />
                  ))}
                </div>
              </div>
            )}
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => fetchProducts(page - 1, selectedCategory, true)}
              >
                Назад
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={page === i + 1 ? "active" : ""}
                  onClick={() => fetchProducts(i + 1, selectedCategory, true)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => fetchProducts(page + 1, selectedCategory, true)}
              >
                Вперед
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
