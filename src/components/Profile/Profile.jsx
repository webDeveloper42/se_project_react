import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({
  weatherData,
  handleCardClick,
  defaultClothingItems,
  onAddItem,
}) {
  return (
    <div className="profile">
      <Sidebar />
      <ClothesSection
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        defaultClothingItems={defaultClothingItems}
        onAddItem={onAddItem}
      />
    </div>
  );
}
export default Profile;
