import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { setCookie } from "nookies";

import FormInput from "../../components/FormInput/FormInput";
import useForm from "../../hooks/useForm";
import loginValidation from "../../validation/loginValidation";
import { useAuth } from "../../context/AuthContext";
import { fetcher } from "src/hooks/useFetch";

const { publicRuntimeConfig } = getConfig();

const LoginForm = () => {
  const router = useRouter();
  const { setAuthUser } = useAuth();

  const stateInit = {
    username: "",
    password: ""
  };

  const fetchUser = async () => {
    const postLoginOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        identifier: inputValues.username,
        password: inputValues.password
      })
    };

    const postLoginUser = await fetcher(`${publicRuntimeConfig.API_URL}/auth/local`, postLoginOptions);

    if (postLoginUser.statusCode === 400) {
      const error = postLoginUser.message[0].messages[0].message;
      return alert(error);
    }
        else {
          setCookie(null, "jwt", postLoginUser.jwt, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          });
          setCookie(null, "user", postLoginUser.user.username, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          });

          setAuthUser(postLoginUser);
          router.push(`/dashboard/auth`);
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
  } = useForm({ stateInit, validate: loginValidation, submitFunc: fetchUser });

  return (
    <form
    method="POST"
    onSubmit={submitHandler}
    className="flex text-sm text-txt flex-col w-full max-w-xl m-auto"
    data-testid="login-form">
      <label 
      htmlFor="username" 
      className="mb-1 capitalize">
        username  
        {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
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
        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
      </label>
      <FormInput
      id="password"
      type="password"
      name="password" 
      value={inputValues.password}
      onChange={inputChangeHandler} />
      <span className="inline-block text-sec text-sm ml-auto">
        <Link href="/reset">
          <a className="text-purple-400 text-xs">
            Forgot your password?
          </a>
        </Link>
      </span>
      <p className="mb-8">
        Don't have an account? 
          <Link href="/register">
            <a className="text-pink-400 text-xs ml-1">
              Sign Up.
            </a>
          </Link>
      </p>
      <input
      id="submit"
      type="submit"
      name="submit"
      value="submit"
      className="py-2 px-4 w-2/5 m-auto rounded text-txt font-bold uppercase bg-pri border-2 border-pri rounded cursor-pointer hover:bg-sec focus:outline-none focus:ring-2 focus:ring-sec focus:ring-opacity-50" />
    </form>
  )
};

export default LoginForm;