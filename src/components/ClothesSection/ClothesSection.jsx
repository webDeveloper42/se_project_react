import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  weatherData,
  handleCardClick,
  defaultClothingItems,
  onAddItem,
}) {
  return (
    <div className="profile__clothes-section">
      <section className="profile__header">
        <h2 className="profile__title">Your Items</h2>
        <button
          onClick={onAddItem}
          type="button"
          className="profile__add-clothes-btn"
        >
          <span className="profile__add-clothes-btn-icon">&#43;</span> Add
          Clothes
        </button>
      </section>
      <section className="cards profile__cards">
        <ul className="cards__list profile__list">
          {defaultClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                className="profile__card"
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
}
export default ClothesSection;
