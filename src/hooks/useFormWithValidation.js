import { useState, useCallback } from "react";

function useFormWithValidation(defaultValues = {}) {
  const [initialValues] = useState(defaultValues);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const validateForm = useCallback(
    (nextValues = values) => {
      const nextErrors = {};
      const fields = Object.keys(nextValues);

      if (fields.includes("name") && !nextValues.name?.trim()) {
        nextErrors.name = "Name is required.";
      }

      if (fields.includes("imageUrl")) {
        if (!nextValues.imageUrl?.trim()) {
          nextErrors.imageUrl = "Image URL is invalid.";
        } else {
          const rawUrl = nextValues.imageUrl.trim();
          const hasProtocol = /^https?:\/\//i.test(rawUrl);
          const attemptUrl = hasProtocol ? rawUrl : `https://${rawUrl}`;

          try {
            const parsed = new URL(attemptUrl);
            if (!parsed.protocol.match(/^https?:$/i)) {
              nextErrors.imageUrl = "Image URL is invalid.";
            } else if (!parsed.hostname || !parsed.hostname.includes(".")) {
              nextErrors.imageUrl = "Image URL is invalid.";
            }
          } catch (error) {
            nextErrors.imageUrl = "Image URL is invalid.";
          }
        }
      }

      if (fields.includes("weather") && !nextValues.weather) {
        nextErrors.weather = "Please select weather type.";
      }

      if (fields.includes("email") && !nextValues.email?.trim()) {
        nextErrors.email = "Email is required.";
      }

      if (fields.includes("password") && !nextValues.password?.trim()) {
        nextErrors.password = "Password is required.";
      }

      if (fields.includes("avatar") && !nextValues.avatar?.trim()) {
        nextErrors.avatar = "Avatar URL is required.";
      }

      setErrors(nextErrors);
      const formIsValid = Object.keys(nextErrors).length === 0;
      setIsValid(formIsValid);

      return formIsValid;
    },
    [values],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValues = { ...values, [name]: value };
    const nextTouched = { ...touched, [name]: true };

    setValues(nextValues);
    setTouched(nextTouched);

    if (isSubmitted || nextTouched[name]) {
      validateForm(nextValues);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateForm(values);
  };

  const handleReset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsValid(false);
    setIsSubmitted(false);
    setTouched({});
  }, [initialValues]);

  return {
    values,
    handleChange,
    handleBlur,
    resetForm: handleReset,
    setValues,
    errors,
    isValid,
    setIsValid,
    setErrors,
    validateForm,
    isSubmitted,
    setIsSubmitted,
    touched,
    setTouched,
  };
}

export { useFormWithValidation };
