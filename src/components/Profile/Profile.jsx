import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  weatherData,
  handleCardClick,
  defaultClothingItems,
  onAddItem,
  onEditProfile,
  onCardLike,
}) {
  return (
    <div className="profile">
      <Sidebar onEditProfile={onEditProfile} />
      <ClothesSection
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        defaultClothingItems={defaultClothingItems}
        onAddItem={onAddItem}
        onCardLike={onCardLike}
      />
    </div>
  );
}
export default Profile;
