import React, { useState } from "react";
import Link from "next/link";
import FormInput from "src/components/FormInput/FormInput";

const LoginForm = () => {
  return (
    <form
    className="flex flex-col w-full max-w-lg">
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
        Don't have an account? 
          <Link href="/register">
            <a className="text-pri ml-1">
              Sign Up.
            </a>
          </Link>
      </p>
      <input
      id="submit"
      type="submit"
      name="submit"
      value="submit"
      className="py-2 px-4 rounded text-light-bg font-bold capitalize bg-pri cursor-pointer focus:outline-none focus:ring-2 focus:ring-pri focus:ring-opacity-50" />
    </form>
  )
};

export default LoginForm;