import getConfig from "next/config";
import React from "react";

import FormInput from "@/components/FormInput/FormInput";
import useForm from "@/hooks/useForm";
import resetEmailValidation from "@/validation/resetEmailValidation";

const { publicRuntimeConfig } = getConfig();

function ResetForm () {
  const stateInit = {
    email: ""
  };

  async function emailUserCodeHandler () {
    try {
      const emailReset = await fetch(`${publicRuntimeConfig.API_URL}/auth/forgot-password`, {
        email: JSON.stringify(inputValues.email),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      console.log(emailReset);
      console.log("email sent");
    } catch (err) {
      console.error(err);
    }
  }

  const { inputValues,
    inputChangeHandler,
    submitHandler } = useForm({ stateInit,
    validate: resetEmailValidation,
    submitFunc: emailUserCodeHandler });

  return (
    <form
    className="flex flex-col w-full max-w-xl m-auto text-sm text-txt"
    data-testid="reset-form"
    method="POST"
    onSubmit={submitHandler}
    >
      <label
      className="mb-1 capitalize"
      htmlFor="email"
      >
         email
      </label>
      <FormInput
      id="email"
      name="email"
      onChange={inputChangeHandler}
      type="email"
      value={inputValues.email}
      />
      <input
      className="w-2/5 max-w-5xl px-4 py-2 m-auto font-bold uppercase border-2 rounded cursor-pointer 2xl:px-8 2xl:py-4 text-txt bg-pri border-pri hover:bg-sec focus:outline-none focus:ring-2 focus:ring-sec focus:ring-opacity-50"
      id="submit"
      name="submit"
      type="submit"
      value="submit"
      />
    </form>
  );
}

export default ResetForm;
