import { useState } from "react";

export default function useForm({ initialValues }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleSetValues = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSetErrors = (name, error, valid = false) => {
    const errorsObj = { ...errors };
    if (valid) {
      delete errorsObj[name];
      return setErrors(errorsObj);
    }

    return setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return {
    values,
    errors,
    handleSetValues,
    handleSetErrors,
  };
}
