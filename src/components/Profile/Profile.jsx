import "./Profile.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemCard from "../ItemCard/ItemCard";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({
  weatherData,
  handleCardClick,
  defaultClothingItems,
  handleCloseClick,
  onAddItem,
  handleAddClick,
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
