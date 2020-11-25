import React, { useState } from "react";
import Link from "next/link";
import FormInput from "../../components/FormInput/FormInput";

const RegisterForm = () => {
  return (
    <form 
    className="flex flex-col w-full max-w-lg"
    data-testid="register-form">
      <label 
      htmlFor="name" 
      className="mb-1 capitalize">
        name
      </label>
      <FormInput
      id="name"
      type="text"
      name="name" />
      <label 
      htmlFor="email" 
      className="mb-1 capitalize">
        email
      </label>
      <FormInput
      id="email"
      type="email"
      name="email" />
      <label 
      htmlFor="username" 
      className="mb-1 capitalize">
        username
      </label>
      <FormInput
      id="username"
      type="text"
      name="username" />
      <label 
      htmlFor="password" 
      className="mb-1 capitalize">
        password
      </label>
      <FormInput
      id="password"
      type="password"
      name="password" />
      <p className="mb-8">
        Already have an account? 
          <Link href="/login">
            <a className="text-pri ml-1">
              Sign in.
            </a>
          </Link>
      </p>
      <input
      id="submit"
      type="submit"
      name="submit"
      value="submit"
      className="py-2 px-4 rounded text-pri font-bold capitalize bg-light-bg cursor-pointer hover:bg-light-bg focus:outline-none focus:ring-2 focus:ring-pri focus:ring-opacity-50" />
    </form>
  )
};

export default RegisterForm;