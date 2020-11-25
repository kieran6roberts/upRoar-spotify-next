import React, { useState, useEffect } from "react";

const useForm = ({ stateInit = {}}) => {
  const [ inputFields, setInputFields ] = useState(stateInit);
  const [ buttonEnabled, setButtonEnable ] = useState(false);

  const inputChangeHandler = () => {

  };

  const submitHandler = () => {

  };

  const errorHandler = () => {

  };

};

export default useForm;