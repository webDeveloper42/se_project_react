import "./Header.css";
import Logo from "../../assets/logo.svg";
import avatarImg from "../../assets/avatar.png";
function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="Logo" src={Logo} />
      <p className="header__date-and-location">DATE, LOCATION</p>
      <button className="header__add-clothes-btn">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatarImg} alt="Username" className="header__avatar" />
      </div>
    </header>
  );
}
export default Header;
