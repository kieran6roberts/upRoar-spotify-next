import getConfig from "next/config";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect } from "react";

import FormInput from "@/components/FormInput/FormInput";
import LoadingFetch from "@/components/LoadingFetch/LoadingFetch";
import { useAuth } from "@/context/AuthContext";
import useForm from "@/hooks/useForm";
import { fetcher } from "@/utility/fetcher";
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

    setLoading(false);

    if (postLoginUser.statusCode >= 300) {
      const error = postLoginUser.message[0].messages[0].message;

      return alert(error);
    }

    setCookie(null, "jwt", postLoginUser.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      sameSite: "strict"
    });
    setCookie(null, "user", postLoginUser.user.username, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      sameSite: "strict"
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
    loading,
    setLoading,
    submitHandler
  } = useForm({ stateInit,
    validate: loginValidation,
    submitFunc: fetchUser });

  return (
    <>
    {loading && <LoadingFetch />}
    <form
    className="flex flex-col w-full max-w-5xl m-auto text-sm text-txt"
    data-testid="login-form"
    method="POST"
    onSubmit={submitHandler}
    >
      <label
      className="mb-1 capitalize xl:mb-3"
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
      className="mb-1 capitalize xl:mb-3"
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
          <a className="ml-1 text-sm text-pink-400">
              Sign Up.
          </a>
        </Link>
      </p>
      <input
      className="w-2/5 px-4 py-2 m-auto font-bold uppercase border-2 rounded cursor-pointer 2xl:px-8 2xl:py-4 text-txt bg-pri border-pri focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:bg-sec"
      id="submit"
      name="submit"
      type="submit"
      value="submit"
      />
    </form>
    </>
  );
}

export default LoginForm;
