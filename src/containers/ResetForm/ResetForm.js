import React, { useState } from "react";
import useForm from "src/hooks/useForm";
import resetEmailValidation from "src/validation/resetEmailValidation";
import FormInput from "src/components/FormInput/FormInput";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const ResetForm = () => {
  const stateInit = {
    email: ""
  }

  const emailUserCodeHandler = async () => {
    try {
      const emailReset = await fetch(`${publicRuntimeConfig.API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        email: JSON.stringify(inputValues.email)
      });
      console.log(emailReset);
      console.log("email sent");
    }  
      catch(err) {
        console.error(err);
    }
  };

  const { inputValues, 
    inputChangeHandler, 
    submitHandler } = useForm({ stateInit, validate: resetEmailValidation, submitFunc: emailUserCodeHandler });

  return (
    <form
    method="POST"
    onSubmit={submitHandler}
    className="flex flex-col w-full max-w-xl"
    data-testid="reset-form">
      <label 
      htmlFor="email" 
      className="mb-1 capitalize">
        email
      </label>
      <FormInput
      id="email"
      type="email"
      name="email"
      value={inputValues.email}
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