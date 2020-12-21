import getConfig from "next/config";
import Router from "next/router";
import React from "react";

import FormInput from "@/components/FormInput/FormInput";
import { fetcher } from "@/hooks/useFetch";
import useForm from "@/hooks/useForm";
import passwordValidation from "@/validation/passwordValidation";

const { publicRuntimeConfig } = getConfig();

function ResetForm () {
  const stateInit = {
    confirmPassword: "",
    password: "",
    resetCode: ""
  };

  async function userResetHandler () {
    try {
      const emailReset = await fetcher(`${publicRuntimeConfig.API_URL}/auth/reset-password`, {
        code: JSON.stringify(inputValues.resetCode),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        password: JSON.stringify(inputValues.password),
        passwordConfirmation: JSON.stringify(inputValues.confirmPassword)
      });

      const response = await emailReset.json();

      console.log(response);
      Router.push("/login");
    } catch (err) {
      console.error(err);
    }
  }

  const { inputValues,
    inputChangeHandler,
    submitHandler } = useForm({ stateInit,
    validate: passwordValidation,
    submitFunc: userResetHandler });

  return (
    <form
    className="flex flex-col w-full max-w-xl"
    data-testid="reset-form"
    method="POST"
    onSubmit={submitHandler}
    >
      <label
      className="mb-1 capitalize"
      htmlFor="email"
      >
         password
      </label>
      <FormInput
      id="password"
      name="password"
      onChange={inputChangeHandler}
      type="password"
      value={inputValues.password}
      />
      <label
      className="mb-1 capitalize"
      htmlFor="confirmPassword"
      >
         confirm password
      </label>
      <FormInput
      id="confirm password"
      name="confirmPassword"
      onChange={inputChangeHandler}
      type="password"
      value={inputValues.confirmPassword}
      />
      <input
      className="px-4 py-2 font-bold uppercase border border-gray-500 rounded cursor-pointer text-txt bg-pri hover:bg-sec focus:outline-none focus:ring-2 focus:ring-sec focus:ring-opacity-50"
      id="submit"
      name="submit"
      type="submit"
      value="submit"
      />
    </form>
  );
}

export default ResetForm;
