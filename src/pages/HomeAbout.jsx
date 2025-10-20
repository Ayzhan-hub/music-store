import storeImage from "../assets/img/store.png";

function HomeAbout() {
  return (
    <section className="about">
      <h2 className="about__title">О нашем магазине</h2>
      <div className="about__content">
        <img src={storeImage} alt="Наш магазин" className="about__image" />
        <p className="about__text">
          BangStore — место, где рождается музыка. Мы собрали лучшие инструменты и оборудование,
          чтобы помочь вам звучать ярко и вдохновенно. Только проверенные бренды, честный сервис и
          страсть к звуку.
        </p>
      </div>
    </section>
  );
}

export default HomeAbout;
