import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
function ClothesSection({
  weatherData,
  handleCardClick,
  defaultClothingItems,
}) {
  return (
    <div className="profile__clothes-section">
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
