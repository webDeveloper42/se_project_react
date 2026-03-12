import "./Header.css";
import Logo from "../../assets/logo.svg";
import avatarImg from "../../assets/avatar.png";
import { currentDate } from "../../utils/constants";

function Header({ handleAddClick, weatherData }) {
  return (
    <header className="header">
      <img className="header__logo" alt="Logo" src={Logo} />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city} {weatherData.country}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        <span className="header__add-clothes-btn-icon">&#43;</span> Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatarImg} alt="User avatar" className="header__avatar" />
      </div>
    </header>
  );
}
export default Header;
