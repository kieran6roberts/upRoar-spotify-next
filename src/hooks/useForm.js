import { useState, useEffect } from "react";

const useForm = ({ stateInit = {}, validate, submitFunc }) => {
  const [ inputValues, setInputValues ] = useState(stateInit);
  const [ errors, setErrors ] = useState({});
  const [ submitting, setSubmitting ] = useState(false);

  const inputChangeHandler = event => {
    const { value, name } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const isObjectEmpty = obj => Object.keys(obj).length === 0;

  const submitHandler = event => {
      event.preventDefault();
      setErrors(validate(inputValues));
      setSubmitting(true);
  };

  useEffect(() =>{
    if (isObjectEmpty(errors) && submitting) {
      submitFunc();
    }
  }, [submitting, errors]);

  return {
    inputValues: inputValues,
    errors: errors,
    submitting: submitting,
    inputChangeHandler: inputChangeHandler,
    submitHandler: submitHandler,
    setInputValues: setInputValues

  }
};

export default useForm;