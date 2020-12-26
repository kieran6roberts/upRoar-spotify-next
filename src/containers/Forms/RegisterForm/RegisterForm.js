import getConfig from "next/config";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect } from "react";

import FormInput from "@/components/FormInput/FormInput";
import { useAuth } from "@/context/AuthContext";
import useForm from "@/hooks/useForm";
import { fetcher } from "@/utility/fetcher";
import registerValidation from "@/validation/registerValidation";

const { publicRuntimeConfig } = getConfig();

function RegisterForm () {
  const router = useRouter();
  const { setAuthUser } = useAuth();

  const stateInit = {
    confirm: "",
    email: "",
    name: "",
    password: "",
    username: ""
  };


  async function userRegistrationHandler () {
    const registerUser = await fetcher(`${publicRuntimeConfig.API_URL}/auth/local/register`, {
        body: JSON.stringify({
          email: inputValues.email,
          name: inputValues.name,
          password: inputValues.password,
          user: inputValues.username,
          username: inputValues.username
        }),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "POST"
      });


    if (registerUser.statusCode === 400) {
      const error = registerUser.message[0].messages[0].message;

      throw new Error(error);
    }

    setCookie(null, "jwt", registerUser.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      sameSite: "strict"
    });
    setCookie(null, "user", registerUser.user.username, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      sameSite: "strict"
    });
    setAuthUser(registerUser);
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
    validate: registerValidation,
    submitFunc: userRegistrationHandler });

  return (
    <form
    className="flex flex-col w-full max-w-5xl m-auto text-sm text-txt"
    data-testid="register-form"
    onSubmit={submitHandler}
    >
      <label
      className="mb-1 capitalize xl:mb-3"
      htmlFor="name"
      >
         name
      </label>
         {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      <FormInput
      id="name"
      name="name"
      onChange={inputChangeHandler}
      type="text"
      value={inputValues.name}
      />
      <label
      className="mb-1 capitalize xl:mb-3"
      htmlFor="email"
      >
         email
      </label>
         {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      <FormInput
      id="email"
      name="email"
      onChange={inputChangeHandler}
      type="email"
      value={inputValues.email}
      />
      <label
      className="mb-1 capitalize xl:mb-3"
      htmlFor="username"
      >
         username
      </label>
      {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
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
      </label>
      {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
      <FormInput
      id="password"
      name="password"
      onChange={inputChangeHandler}
      type="password"
      value={inputValues.password}
      />
      <label
      className="mb-1 capitalize xl:mb-3"
      htmlFor="confirm"
      >
         confirm password
      </label>
         {errors.confirm && <p className="text-xs text-red-500">{errors.confirm}</p>}
      <FormInput
      data-testid="confirm"
      id="confirm"
      name="confirm"
      onChange={inputChangeHandler}
      type="password"
      value={inputValues.confirm}
      />
      <p className="mb-8">
          Already have an account?
        <Link href="/login">
          <a className="ml-1 text-pink-400">
              Sign in.
          </a>
        </Link>
      </p>
      <input
      className="w-2/5 px-4 py-2 m-auto font-bold uppercase border-2 border-pink-200 rounded cursor-pointer 2xl:px-8 2xl:py-4 text-txt bg-pri focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:bg-sec"
      id="submit"
      name="submit"
      type="submit"
      value="submit"
      />
    </form>
  );
}

export default RegisterForm;
