import { useState, useEffect } from "react";
import "../assets/css/components/homepagebanner.css";

export default function HomePageBanner() {
  const banners = ["/banner1.png", "/banner2.png"];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section className="homepage__banner-section">
      <img src={banners[currentBanner]} className="homepage__banner" alt="Главный баннер" />
      <div className="homepage__overlay">
        <h2 className="homepage__title">Музыкальные инструменты для всех</h2>
        <p className="homepage__desc">
          Гитары, ударные, клавишные и многое другое — всё, чтобы создать свою музыку.
        </p>
      </div>
    </section>
  );
}
