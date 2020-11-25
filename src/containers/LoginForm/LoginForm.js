import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FormInput from "../../components/FormInput/FormInput";
import useForm from "../../hooks/useForm";
import formValidation from "../../formValidation";
import { route } from "next/dist/next-server/server/router";

const LoginForm = () => {
  const router = useRouter();

  const stateInit = {
    username: "",
    password: ""
  };

  const handleSuccessfulSubmit = () => {
    router.push("/profile/user");
  };

  const [ 
    inputValues, 
    errors, 
    submitting, 
    inputChangeHandler, 
    submitHandler, ] = useForm({ stateInit, submitFunc: handleSuccessfulSubmit });

  return (
    <form
    onSubmit={submitHandler}
    className="flex flex-col w-full max-w-xl"
    data-testid="login-form">
      <label 
      htmlFor="username" 
      className="mb-1 capitalize">
        username
      </label>
      <FormInput
      id="username"
      type="text"
      name="username"
      value={inputValues.username}
      onChange={inputChangeHandler} />
      <label 
      htmlFor="password" 
      className="mb-1 capitalize">
        password
      </label>
      <FormInput
      id="password"
      type="password"
      name="password" 
      value={inputValues.password}
      onChange={inputChangeHandler} />
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
      className="py-2 px-4 rounded text-pri font-bold capitalize bg-light-bg cursor-pointer focus:outline-none focus:ring-2 focus:ring-pri focus:ring-opacity-50" />
    </form>
  )
};

export default LoginForm;