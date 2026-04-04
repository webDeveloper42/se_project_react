import "./Header.css";
import Logo from "../../assets/logo.svg";
import { currentDate } from "../../utils/constants";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  weatherData,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="Logo" src={Logo} />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city} {weatherData.country}
      </p>
      <ToggleSwitch />
      {currentUser ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            <span className="header__add-clothes-btn-icon">&#43;</span> Add
            Clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar}
                alt="User avatar"
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={handleRegisterClick}
            type="button"
            className="header__add-clothes-btn header__sign-up"
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginClick}
            type="button"
            className="header__add-clothes-btn header__login"
          >
            Login
          </button>
        </>
      )}
    </header>
  );
}
export default Header;
