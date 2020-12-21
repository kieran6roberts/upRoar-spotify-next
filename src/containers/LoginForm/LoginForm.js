import getConfig from "next/config";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect } from "react";

import FormInput from "@/components/FormInput/FormInput";
import { useAuth } from "@/context/AuthContext";
import { fetcher } from "@/hooks/useFetch";
import useForm from "@/hooks/useForm";
import loginValidation from "@/validation/loginValidation";

const { publicRuntimeConfig } = getConfig();

function LoginForm () {
  const router = useRouter();
  const { setAuthUser } = useAuth();

  const stateInit = {
    password: "",
    username: ""
  };

  async function fetchUser () {
    const postLoginOptions = {
      body: JSON.stringify({
        identifier: inputValues.username,
        password: inputValues.password
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    };

    const postLoginUser = await fetcher(`${publicRuntimeConfig.API_URL}/auth/local`, postLoginOptions);

    if (postLoginUser.statusCode === 400) {
      const error = postLoginUser.message[0].messages[0].message;

      return alert(error);
    }

    setCookie(null, "jwt", postLoginUser.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/"
    });
    setCookie(null, "user", postLoginUser.user.username, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/"
    });

    setAuthUser(postLoginUser);
    router.push("/dashboard/auth");

    return null;
  }


  useEffect(() => {
    router.prefetch("/dashboard/auth");
  }, []);

  const {
    inputValues,
    errors,
    inputChangeHandler,
    submitHandler
  } = useForm({ stateInit,
    validate: loginValidation,
    submitFunc: fetchUser });

  return (
    <form
    className="flex flex-col w-full max-w-xl m-auto text-sm text-txt"
    data-testid="login-form"
    method="POST"
    onSubmit={submitHandler}
    >
      <label
      className="mb-1 capitalize"
      htmlFor="username"
      >
         username
        {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
      </label>
      <FormInput
      id="username"
      name="username"
      onChange={inputChangeHandler}
      type="text"
      value={inputValues.username}
      />
      <label
      className="mb-1 capitalize"
      htmlFor="password"
      >
         password
        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
      </label>
      <FormInput
      id="password"
      name="password"
      onChange={inputChangeHandler}
      type="password"
      value={inputValues.password}
      />
      <p className="mb-8">
          Don't have an account?
        <Link href="/register">
          <a className="ml-1 text-xs text-pink-400">
              Sign Up.
          </a>
        </Link>
      </p>
      <input
      className="w-2/5 px-4 py-2 m-auto font-bold uppercase border-2 rounded cursor-pointer text-txt bg-pri border-pri focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:bg-sec"
      id="submit"
      name="submit"
      type="submit"
      value="submit"
      />
    </form>
  );
}

export default LoginForm;
