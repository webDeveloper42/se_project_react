import "./DeleteModal.css";
import closeBtn from "../../assets/closeBtn.png";
function DeleteModal({ isOpen, handleCloseClick, onDelete }) {
  return (
    <div
      onClick={handleCloseClick}
      className={`modal modal__delete ${isOpen ? "modal_opened" : ""}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal__content modal__delete-content"
      >
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img className="modal__close-img" src={closeBtn} alt="Close Button" />
        </button>
        <div className="modal__text-container">
          <h2 className="modal__title">
            Are you sure you want to delete this item?
          </h2>
          <p className="modal__text">This action is irreversible</p>
        </div>
        <div className="modal__delete-btns-container">
          <button onClick={onDelete} className="modal__delete-btn">
            Yes, delete item
          </button>
          <button onClick={handleCloseClick} className="modal__delete-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteModal;
