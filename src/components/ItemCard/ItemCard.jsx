import "./ItemCard.css";
import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CardLike from "../../assets/card__like.svg";
import CardLiked from "../../assets/card__liked.svg";

function ItemCard({ item, onCardClick, className, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const initialLiked = (item.likes || []).some(
    (id) => id === currentUser?._id || id?._id === currentUser?._id,
  );

  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    if (onCardLike) {
      onCardLike({ id: item._id, isLiked });
    }
  };

  return (
    <li className={`card ${className}`}>
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <button onClick={handleLike} className="card__like-button">
          <img src={isLiked ? CardLiked : CardLike} alt="Card Like Icon" />
        </button>
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link || item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
