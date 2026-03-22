import { useState } from "react";
function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleReset = () => {
    setValues(defaultValues);
  };
  return { values, handleChange, setValues, handleReset };
}
export { useForm };
