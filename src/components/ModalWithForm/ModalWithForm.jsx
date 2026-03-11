import "./ModalWithForm.css";
import closeBtn from "../../assets/closeBtn.png";
function ModalWithForm({ children, buttonText, title }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close">
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
