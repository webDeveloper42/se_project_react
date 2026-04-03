import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";

const LoginModal = ({ isOpen, onCloseModal, onLogin, onSwitchToRegister }) => {
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
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const isFormValid = validateForm(values);

    if (!isFormValid) {
      setTouched({ email: true, password: true });
      return;
    }

    const loginData = {
      email: values.email.trim(),
      password: values.password.trim(),
    };

    if (onLogin) {
      onLogin(loginData);
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
      buttonText="Log In"
      title="Log In"
      isValid={isValid}
      secondaryButtonText="or Sign Up"
      onSecondaryClick={onSwitchToRegister}
    >
      <label
        htmlFor="login-email"
        className={`modal__label ${(isSubmitted || touched.email) && errors.email ? "modal__label_error" : ""}`}
      >
        Email
        <input
          type="email"
          className={`modal__input ${(isSubmitted || touched.email) && errors.email ? "modal__input_error" : ""}`}
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          id="login-email"
          placeholder="Email"
        />
      </label>
      {touched.email && errors.email && (
        <span className="modal__error">{errors.email}</span>
      )}

      <label
        htmlFor="login-password"
        className={`modal__label ${(isSubmitted || touched.password) && errors.password ? "modal__label_error" : ""}`}
      >
        Password
        <input
          type="password"
          className={`modal__input ${(isSubmitted || touched.password) && errors.password ? "modal__input_error" : ""}`}
          name="password"
          id="login-password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Password"
        />
      </label>
      {(isSubmitted || touched.password) && errors.password && (
        <span className="modal__error">{errors.password}</span>
      )}
    </ModalWithForm>
  );
};
export default LoginModal;
