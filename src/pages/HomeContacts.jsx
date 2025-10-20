function HomeContacts() {
  return (
    <section className="contacts">
      <h2 className="contacts__title">Контакты</h2>
      <div className="contacts__info">
        <p>📍 г. Алматы, ул. Абая, 45</p>
        <p>📞 +7 (700) 123-45-67</p>
        <p>✉️ info@bangstore.kz</p>
      </div>

      <iframe
        className="contacts__map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.551896318889!2d76.90684607581908!3d43.23985387906726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3883693052fc853b%3A0x3e0517b99ffc6fe7!2z0L_RgC3Rgi4g0JDQsdCw0Y8gNDUsINCQ0LvQvNCw0YLRiyAwNTAwNjU!5e0!3m2!1sru!2skz!4v1760970569331!5m2!1sru!2skz"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Карта магазина"
      ></iframe>

      <p className="contacts__subtitle">
        Мы находимся в самом сердце города — загляните, чтобы выбрать инструмент своей мечты!
      </p>
    </section>
  );
}

export default HomeContacts;
