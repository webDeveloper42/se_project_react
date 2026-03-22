import "./Profile.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
function Profile() {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatarImg} alt="User avatar" className="header__avatar" />
        </div>
      </div>
      <ClothesSection>
        <AddItemModal />
      </ClothesSection>
    </div>
  );
}
export default Profile;
