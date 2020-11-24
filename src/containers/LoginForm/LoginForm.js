import React, { useState } from "react";
import FormInput from "src/components/FormInput/FormInput";

const LoginForm = () => {
  return (
    <form
    className="flex flex-col w-full max-w-lg">
      <label 
      for="username" 
      className="">
        username
      </label>
      <FormInput
      id="username"
      type="text"
      name="username" />
      <label 
      for="password" 
      className>
        password
      </label>
      <FormInput
      id="password"
      type="password"
      name="password" />
    </form>
  )
};

export default LoginForm;