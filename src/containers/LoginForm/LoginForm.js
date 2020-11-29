import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import getConfig from "next/config";
import FormInput from "../../components/FormInput/FormInput";
import useForm from "../../hooks/useForm";
import loginValidation from "../../validation/loginValidation";
import { useAuth } from "../../context/AuthContext";
import { setCookie } from "nookies";

const { publicRuntimeConfig } = getConfig();

const LoginForm = () => {
  const router = useRouter();
  const { setAuthUser } = useAuth();

  const stateInit = {
    username: "",
    password: ""
  };

  const fetchUser = async () => {
    const userLoginInfo = {
      identifier: inputValues.username,
      password: inputValues.password
    }

    try {
      const login = await fetch(`${publicRuntimeConfig.API_URL}/auth/local`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userLoginInfo)
      });
  
      const loginResponse = await login.json();

      if(loginResponse.statusCode === 400) {
        const error = loginResponse.message[0].messages[0].message;
        return alert(error);
      }
        else {
          setCookie(null, "jwt", loginResponse.jwt, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          });
          setCookie(null, "user", loginResponse.user.username, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          });
          setAuthUser(loginResponse);
          router.push(`/dashboard/auth`);
        }
    }
      catch(err) {
        console.error("there was a problem fetching the data", err);
      }
  };

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
    className="flex flex-col w-full max-w-xl"
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
      <span className="inline-block text-pri text-sm ml-auto">
        <Link href="/reset">
          <a className="">
            Forgot your password?
          </a>
        </Link>
      </span>
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