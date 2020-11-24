import React, { useState } from "react";
import FormInput from "src/components/FormInput/FormInput";

const LoginForm = () => {
  return (
    <form
    className="flex flex-col w-full max-w-lg">
      <label 
      for="name" 
      className="">
        name
      </label>
      <FormInput
      id="name"
      type="text"
      name="name" />
      <label 
      for="email" 
      className>
        email
      </label>
      <FormInput
      id="email"
      type="email"
      name="email" />
    </form>
  )
};

export default LoginForm;