import React from "react";
import useForm from "src/hooks/useForm";
import passwordValidation from "src/validation/passwordValidation";
import FormInput from "src/components/FormInput/FormInput";
import getConfig from "next/config";
import fetch from "isomorphic-fetch";
import Router from "next/router";

const { publicRuntimeConfig } = getConfig();

const ResetForm = () => {
  const stateInit = {
    resetCode: "",
    password: "",
    confirmPassword: ""
  }

  const userResetHandler = async () => {
    try {
      const emailReset = await fetch(`${publicRuntimeConfig.API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        code: JSON.stringify(inputValues.resetCode),
        password: JSON.stringify(inputValues.password),
        passwordConfirmation: JSON.stringify(inputValues.confirmPassword),

      });

      const response = await emailReset.json();
      console.log(response);
      Router.push("/login");
    }  
      catch(err) {
        console.error(err);
    }
  };

  const { inputValues, 
    inputChangeHandler, 
    submitHandler } = useForm({ stateInit, validate: passwordValidation, submitFunc: userResetHandler });

  return (
    <form
    method="POST"
    onSubmit={submitHandler}
    className="flex flex-col w-full max-w-xl"
    data-testid="reset-form">
      <label 
      htmlFor="email" 
      className="mb-1 capitalize">
        password
      </label>
      <FormInput
      id="password"
      type="password"
      name="password"
      value={inputValues.password}
      onChange={inputChangeHandler} />
      <label 
      htmlFor="confirmPassword" 
      className="mb-1 capitalize">
        confirm password
      </label>
      <FormInput
      id="confirm password"
      type="password"
      name="confirmPassword"
      value={inputValues.confirmPassword}
      onChange={inputChangeHandler} />
            <input
      id="submit"
      type="submit"
      name="submit"
      value="submit"
      className="py-2 px-4 rounded text-pri font-bold capitalize bg-light-bg cursor-pointer focus:outline-none focus:ring-2 focus:ring-pri focus:ring-opacity-50" />
    </form>
  )
};

export default ResetForm;