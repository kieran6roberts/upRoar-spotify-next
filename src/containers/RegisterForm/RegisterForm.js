import React, { useEffect } from "react";
import Link from "next/link";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

import FormInput from "../../components/FormInput/FormInput";
import useForm from "../../hooks/useForm";
import registerValidation from "../../validation/registerValidation";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "../../hooks/useFetch";

const { publicRuntimeConfig } = getConfig();

const RegisterForm = () => {
  const router = useRouter();
  const { setAuthUser } = useAuth();

  const stateInit = {
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  }

  const userRegistrationHandler = async () => {
    const postRegisterOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: inputValues.name,
        email: inputValues.email,
        username: inputValues.username,
        password: inputValues.password,
        profile: inputValues.username,
        user: inputValues.username
      })
    };

    const postRegisterUser = await fetcher(`${publicRuntimeConfig.API_URL}/auth/local/register`, postRegisterOptions);

      if (postRegisterUser.statusCode === 400) {
        const error = postRegisterUser.message[0].messages[0].message;
        return alert(error);
      }
        else {
          setCookie(null, "jwt", postRegisterUser.jwt, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          });
          setCookie(null, "user", postRegisterUser.user.username, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          });
          setAuthUser(postRegisterUser);
          router.push("/dashboard/auth");
        }
    }

  useEffect(() => {
    router.prefetch("/dashboard/auth");
  }, []);

  const {
    inputValues, 
    errors, 
    submitting, 
    inputChangeHandler, 
    submitHandler 
  } = useForm({ stateInit, validate: registerValidation, submitFunc: userRegistrationHandler });

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
      htmlFor="confirmPassword" 
      className="mb-1 capitalize">
        confirm password  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
      </label>
      <FormInput
      id="confirm password"
      type="password"
      name="confirmPassword"
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
      className="py-2 px-4 rounded text-txt font-bold capitalize border border-gray-500 rounded bg-pri cursor-pointer hover:bg-sec focus:outline-none focus:ring-2 focus:ring-pri focus:ring-opacity-50" />
    </form>
  )
};

export default RegisterForm;