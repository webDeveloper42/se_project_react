import "./Header.css";
import Logo from "../../assets/logo.svg";
import avatarImg from "../../assets/avatar.png";
import { currentDate } from "../../utils/constants";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="Logo" src={Logo} />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city} {weatherData.country}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        <span className="header__add-clothes-btn-icon">&#43;</span> Add Clothes
      </button>
      <Link to="/Profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatarImg} alt="User avatar" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}
export default Header;
