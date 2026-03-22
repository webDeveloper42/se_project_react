import "./Sidebar.css";
import avatarImg from "../../assets/avatar.png";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="header__user-container sidebar-container">
        <p className="header__username sidebar-username">Terrence Tegegne</p>
        <img
          src={avatarImg}
          alt="User avatar"
          className="header__avatar sidebar-avatar"
        />
      </div>
    </div>
  );
}
export default Sidebar;
