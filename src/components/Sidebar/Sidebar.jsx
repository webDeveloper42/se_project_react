import "./Sidebar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Sidebar({ onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="header__user-container sidebar-container">
        <img
          src={currentUser?.avatar}
          alt="User avatar"
          className="header__avatar sidebar-avatar"
        />
        <p className="header__username sidebar-username">
          {currentUser?.name}
        </p>
      </div>
      <button
        onClick={onEditProfile}
        type="button"
        className="sidebar__edit-btn"
      >
        Change Profile Data
      </button>
    </div>
  );
}
export default Sidebar;
