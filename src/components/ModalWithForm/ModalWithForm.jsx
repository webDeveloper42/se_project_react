import "./ModalWithForm.css";
import closeBtn from "../../assets/closeBtn.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
  isOpen,
}) {
  return (
    <div
      onClick={handleCloseClick}
      className={`modal  ${isOpen && "modal_opened"}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img className="modal__close-img" src={closeBtn} alt="Close Button" />
        </button>
        <form action="" className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
