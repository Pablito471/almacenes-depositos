import { useState, useCallback } from "react";

export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(values);
    },
    [values, onSubmit],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFormValues = useCallback((newValues) => {
    setValues(newValues);
  }, []);

  const setFormErrors = useCallback((newErrors) => {
    setErrors(newErrors);
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues: setFormValues,
    setErrors: setFormErrors,
  };
};
