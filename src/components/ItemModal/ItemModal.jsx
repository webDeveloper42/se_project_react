import "./ItemModal.css";
import closeBtn from "../../assets/closeBtn.png";
function ItemModal({ activeModal, card, handleCloseClick }) {
  return (
    <div className={`modal  ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img className="modal__close-img" src={closeBtn} alt="Close Button" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption"></h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
