import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });
  return (
    <ModalWithForm
      isOpen={isOpen}
      handleCloseClick={onCloseModal}
      onSubmit={onAddItem}
      buttonText="Add garment"
      title="New garment"
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
        />
      </label>
      <label htmlFor="Image URL" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          name="imagUrl"
          id="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            type="radio"
            onChange={handleChange}
            className="modal__radio-input "
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            type="radio"
            onChange={handleChange}
            className="modal__radio-input "
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            type="radio"
            onChange={handleChange}
            className="modal__radio-input "
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};
export default AddItemModal;
