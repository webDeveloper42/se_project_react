import "./ItemModal.css";
import { useContext } from "react";
import closeBtn from "../../assets/closeBtnWhite.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, handleCloseClick, handleOpenDeleteModal }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = currentUser && card.owner === currentUser._id;

  return (
    <div
      onClick={handleCloseClick}
      className={`modal modal__delete  ${activeModal === "preview" ? "modal_opened" : ""}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal__content modal__content_type_image"
      >
        <button onClick={handleCloseClick} type="button" className="modal__close">
          <img className="modal__close-img" src={closeBtn} alt="Close Button" />
        </button>
        <img
          src={card.link || card.imageUrl}
          alt={card.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__footer-heading">
            <h2 className="modal__caption">{card.name}</h2>
            {isOwner && (
              <button
                onClick={handleOpenDeleteModal}
                type="button"
                className="modal__delete-btn"
              >
                Delete Item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
