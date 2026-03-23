import { useFormWithValidation } from "./useFormWithValidation";

function useForm(defaultValues) {
  const { values, handleChange, resetForm, setValues } =
    useFormWithValidation(defaultValues);

  return {
    values,
    handleChange,
    setValues,
    handleReset: resetForm,
  };
}

export { useForm };
