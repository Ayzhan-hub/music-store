import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { axiosInstance } from "../services/axios";

export default function ProfilePage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    async function fetchUserData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [isLoggedIn, navigate]);

  if (loading) return <Loader />;

  return (
    <>
      <Header />
      <main className="profile">
        <h1 className="profile__title">Мой профиль</h1>

        {user ? (
          <div className="profile__card">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="Аватар пользователя"
              className="profile__avatar"
            />
            <div className="profile__info">
              <p>
                <strong>Имя:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Дата регистрации:</strong> {user.createdAt?.split("T")[0]}
              </p>
            </div>
          </div>
        ) : (
          <p>Не удалось загрузить данные профиля</p>
        )}
      </main>
      <Footer />
    </>
  );
}
