import { useEffect, useState } from "react";

function useForm ({ stateInit = {}, validate, submitFunc }) {
  const [
    inputValues,
    setInputValues
  ] = useState(stateInit);
  const [
    errors,
    setErrors
  ] = useState({});
  const [
    submitting,
    setSubmitting
  ] = useState(false);
  const [
    loading,
    setLoading
  ] = useState(false);

  function inputChangeHandler (event) {
    const { value, name } = event.target;

    setInputValues({
      ...inputValues,
      [name]: value
    });
  }

  function isObjectEmpty (obj) {
    return Object.keys(obj).length === 0;
  }

  function submitHandler (event) {
    event.preventDefault();
    setErrors(validate(inputValues));
    setSubmitting(true);
  }

  useEffect(() => {
    if (isObjectEmpty(errors) && submitting) {
      submitFunc();
      setLoading(true);
    }
  }, [
    submitting,
    errors
  ]);

  return {
    errors,
    inputChangeHandler,
    inputValues,
    loading,
    setInputValues,
    setLoading,
    submitHandler,
    submitting
  };
}

export default useForm;
