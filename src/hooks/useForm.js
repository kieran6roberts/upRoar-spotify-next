import React, { useState, useEffect } from "react";

const useForm = ({ stateInit = {}, validate = null, submitFunc }) => {
  const [ inputValues, setInputValues ] = useState(stateInit);
  const [ buttonEnabled, setButtonEnabled ] = useState(false);
  const [ errors, setErrors ] = useState({});
  const [ submitting, setSubmitting ] = useState(false);

  const inputChangeHandler = event => {
    const { value, name } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
    setErrors(validate(inputValues));
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
  }, [submitting]);

  return [
    inputValues, 
    errors, 
    submitting, 
    inputChangeHandler, 
    submitHandler,
    setSubmitting
  ];
};

export default useForm;