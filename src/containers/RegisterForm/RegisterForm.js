import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FormInput from "../../components/FormInput/FormInput";
import useForm from "../../hooks/useForm";
import registerValidation from "../../registerValidation";

const RegisterForm = () => {
  const router = useRouter();

  const stateInit = {
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  }

  const handleSuccessfulSubmit = () => {
    router.push("/profile/user");
  };

  const [ 
    inputValues, 
    errors, 
    submitting, 
    inputChangeHandler, 
    submitHandler ] = useForm({ stateInit, validate: registerValidation, submitFunc: handleSuccessfulSubmit });

  return (
    <form 
    onSubmit={submitHandler}
    className="flex flex-col w-full max-w-xl"
    data-testid="register-form">
      <label 
      htmlFor="name" 
      className="mb-1 capitalize">
        name  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </label>
      <FormInput
      id="name"
      type="text"
      name="name"
      value={inputValues.name}
      onChange={inputChangeHandler} />
      <label 
      htmlFor="email" 
      className="mb-1 capitalize">
        email {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </label>
      <FormInput
      id="email"
      type="email"
      name="email"
      value={inputValues.email}
      onChange={inputChangeHandler} />
      <label 
      htmlFor="username" 
      className="mb-1 capitalize">
        username 
        <p className={`text-xs
          ${errors.username ? "text-red-500" : "text-light-text"}
          `}>{errors.username || "*Must be between 5 and 15 charcters long"}
        </p>
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
        <p className={`text-xs
          ${errors.password ? "text-red-500" : "text-light-text"}
          `}>{errors.password || "*Must be between 6 and 16 characters long and contain at least 1 number and 1 uppercase character"}
        </p>
      </label>
      <FormInput
      id="password"
      type="password"
      name="password"
      value={inputValues.password}
      onChange={inputChangeHandler} />
      <label 
      htmlFor="confirm password" 
      className="mb-1 capitalize">
        confirm password  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
      </label>
      <FormInput
      id="confirm password"
      type="password"
      name="confirm password"
      value={inputValues.confirmPassword}
      onChange={inputChangeHandler} />
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