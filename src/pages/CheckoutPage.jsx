function CheckoutPage() {
  return (
    <div>
      <h1>Оформление заказа</h1>
      <form>
        <input type="text" placeholder="ФИО" />
        <input type="text" placeholder="Адрес доставки" />
        <input type="text" placeholder="Телефон" />
        <button type="submit">Заказать</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
