import "./ItemCard.css";
function ItemCard({ item, onCardClick, className }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className={`card ${className}`}>
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image "
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
