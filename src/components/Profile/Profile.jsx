import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  handleCardClick,
  defaultClothingItems,
  onAddItem,
  onEditProfile,
  onCardLike,
  onLogout,
}) {
  return (
    <div className="profile">
      <Sidebar onEditProfile={onEditProfile} onLogout={onLogout} />
      <ClothesSection
        handleCardClick={handleCardClick}
        defaultClothingItems={defaultClothingItems}
        onAddItem={onAddItem}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
