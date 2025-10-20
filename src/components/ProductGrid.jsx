export default function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((p, i) => (
        <div key={i} className="product-card">
          <img src={p.image || "/no-image.jpg"} alt={p.name} className="product-card__img" />
          <h3 className="product-card__name">{p.name}</h3>
          <p className="product-card__price">{p.price ? `${p.price} ₸` : "Цена не указана"}</p>
        </div>
      ))}
    </div>
  );
}
