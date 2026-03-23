import "./ItemModal.css";
import closeBtn from "../../assets/closeBtnWhite.svg";
function ItemModal({
  activeModal,
  card,
  handleCloseClick,
  handleOpenDeleteModal,
}) {
  return (
    <div
      onClick={handleCloseClick}
      className={`modal modal__delete  ${activeModal === "preview" && "modal_opened"}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal__content modal__content_type_image"
      >
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
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
            <button
              onClick={handleOpenDeleteModal}
              type="button"
              className="modal__delete-btn"
            >
              Delete Item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
