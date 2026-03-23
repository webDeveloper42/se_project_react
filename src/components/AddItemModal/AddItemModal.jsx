import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const {
    values,
    handleChange,
    handleBlur,
    resetForm,
    errors,
    isValid,
    validateForm,
    isSubmitted,
    setIsSubmitted,
    touched,
    setTouched,
  } = useFormWithValidation({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const isFormValid = validateForm(values);

    if (!isFormValid) {
      setTouched({ name: true, imageUrl: true, weather: true });
      return;
    }

    const generatedId = String(Date.now());

    const cleanItem = {
      name: values.name.trim(),
      imageUrl: values.imageUrl.trim(),
      weather: values.weather,
      id: generatedId,
      _id: generatedId,
    };

    onAddItem(cleanItem);
    resetForm();
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <ModalWithForm
      isOpen={isOpen}
      handleCloseClick={onCloseModal}
      onSubmit={handleSubmit}
      buttonText="Add garment"
      title="New garment"
      isValid={isValid}
    >
      <label
        htmlFor="name"
        className={`modal__label ${(isSubmitted || touched.name) && errors.name ? "modal__label_error" : ""}`}
      >
        Name{" "}
        <input
          type="text"
          className={`modal__input ${(isSubmitted || touched.name) && errors.name ? "modal__input_error" : ""}`}
          name="name"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
          id="name"
          placeholder="Name"
        />
      </label>
      {touched.name && errors.name && (
        <span className="modal__error">{errors.name}</span>
      )}

      <label
        htmlFor="imgUrl"
        className={`modal__label ${(isSubmitted || touched.imageUrl) && errors.imageUrl ? "modal__label_error" : ""}`}
      >
        Image{" "}
        <input
          type="url"
          className={`modal__input ${(isSubmitted || touched.imageUrl) && errors.imageUrl ? "modal__input_error" : ""}`}
          name="imageUrl"
          id="imageUrl"
          value={values.imageUrl}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Image URL"
        />
      </label>
      {(isSubmitted || touched.imageUrl) && errors.imageUrl && (
        <span className="modal__error">{errors.imageUrl}</span>
      )}
      <fieldset
        className={`modal__radio-buttons ${(isSubmitted || touched.weather) && errors.weather ? "modal__radio-buttons_error" : ""}`}
      >
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            type="radio"
            value="hot"
            onChange={handleChange}
            onBlur={handleBlur}
            className="modal__radio-input "
            checked={values.weather === "hot"}
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
            checked={values.weather === "warm"}
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
            checked={values.weather === "cold"}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};
export default AddItemModal;
