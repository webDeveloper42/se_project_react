import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange, handleReset } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };
  useEffect(() => {
    if (isOpen) {
      handleReset();
    }
  }, [isOpen]);
  return (
    <ModalWithForm
      isOpen={isOpen}
      handleCloseClick={onCloseModal}
      onSubmit={handleSubmit}
      buttonText="Add garment"
      title="New garment"
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          name="name"
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="imgUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          name="imageUrl"
          id="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            type="radio"
            value="hot"
            onChange={handleChange}
            className="modal__radio-input "
            required
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            value="warm"
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
            value="cold"
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
