import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  defaultClothingItems,
  onAddItem,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = defaultClothingItems.filter(
    (item) =>
      item.owner === currentUser?._id || item.owner === currentUser?.id,
  );

  return (
    <div className="profile__clothes-section">
      <section className="profile__header">
        <h2 className="profile__title">Your Items</h2>
        <button
          onClick={onAddItem}
          type="button"
          className="profile__add-clothes-btn"
        >
          <span className="profile__add-clothes-btn-icon">&#43;</span> Add new
        </button>
      </section>
      <section className="cards profile__cards">
        <ul className="cards__list profile__list">
          {userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              className="profile__card"
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ClothesSection;
