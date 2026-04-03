import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";

const RegisterModal = ({ isOpen, onCloseModal, onSignUp, onSwitchToLogin }) => {
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
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const isFormValid = validateForm(values);

    if (!isFormValid) {
      setTouched({
        email: true,
        password: true,
        name: true,
        avatar: true,
      });
      return;
    }

    const userData = {
      email: values.email.trim(),
      password: values.password.trim(),
      name: values.name.trim(),
      avatar: values.avatar.trim(),
    };

    if (onSignUp) {
      onSignUp(userData);
    }

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
      buttonText="Sign Up"
      title="Sign Up"
      isValid={isValid}
      secondaryButtonText="or Login"
      onSecondaryClick={onSwitchToLogin}
    >
      <label
        htmlFor="register-email"
        className={`modal__label ${(isSubmitted || touched.email) && errors.email ? "modal__label_error" : ""}`}
      >
        Email*
        <input
          type="email"
          className={`modal__input ${(isSubmitted || touched.email) && errors.email ? "modal__input_error" : ""}`}
          name="email"
          id="register-email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Email"
        />
      </label>
      {(isSubmitted || touched.email) && errors.email && (
        <span className="modal__error">{errors.email}</span>
      )}
      <label
        htmlFor="register-password"
        className={`modal__label ${(isSubmitted || touched.password) && errors.password ? "modal__label_error" : ""}`}
      >
        Password*
        <input
          type="password"
          className={`modal__input ${(isSubmitted || touched.password) && errors.password ? "modal__input_error" : ""}`}
          name="password"
          id="register-password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Password"
        />
      </label>
      {(isSubmitted || touched.password) && errors.password && (
        <span className="modal__error">{errors.password}</span>
      )}
      <label
        htmlFor="register-name"
        className={`modal__label ${(isSubmitted || touched.name) && errors.name ? "modal__label_error" : ""}`}
      >
        Name*
        <input
          type="text"
          className={`modal__input ${(isSubmitted || touched.name) && errors.name ? "modal__input_error" : ""}`}
          name="name"
          id="register-name"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Name"
        />
      </label>
      {(isSubmitted || touched.name) && errors.name && (
        <span className="modal__error">{errors.name}</span>
      )}
      <label
        htmlFor="register-avatar"
        className={`modal__label ${(isSubmitted || touched.avatar) && errors.avatar ? "modal__label_error" : ""}`}
      >
        Avatar URL*
        <input
          type="url"
          className={`modal__input ${(isSubmitted || touched.avatar) && errors.avatar ? "modal__input_error" : ""}`}
          name="avatar"
          id="register-avatar"
          value={values.avatar}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Avatar URL"
        />
      </label>
      {(isSubmitted || touched.avatar) && errors.avatar && (
        <span className="modal__error">{errors.avatar}</span>
      )}
    </ModalWithForm>
  );
};
export default RegisterModal;
