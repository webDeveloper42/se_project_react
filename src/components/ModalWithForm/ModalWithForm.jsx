import "./ModalWithForm.css";
import closeBtn from "../../assets/closeBtn.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  handleCloseClick,
  isOpen,
  onSubmit,
  isValid,
  secondaryButtonText,
  onSecondaryClick,
  className,
  submitClassName,
}) {
  return (
    <div
      onClick={handleCloseClick}
      className={`modal ${isOpen ? "modal_opened" : ""} ${className || ""}`}
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
        <form action="" onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__form-btns-container">
            <button type="submit" className={`modal__submit ${submitClassName || ""}`} disabled={!isValid}>
              {buttonText}
            </button>
            {secondaryButtonText && onSecondaryClick && (
              <button
                type="button"
                className="modal__secondary-btn"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
