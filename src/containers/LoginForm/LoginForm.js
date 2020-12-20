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
    className="flex flex-col w-full max-w-xl m-auto text-sm text-txt"
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
      <p className="mb-8">
        Don't have an account? 
          <Link href="/register">
            <a className="ml-1 text-xs text-pink-400">
              Sign Up.
            </a>
          </Link>
      </p>
      <input
      id="submit"
      type="submit"
      name="submit"
      value="submit"
      className="w-2/5 px-4 py-2 m-auto font-bold uppercase border-2 rounded cursor-pointer text-txt bg-pri border-pri focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:bg-sec" />
    </form>
  )
};

export default LoginForm;