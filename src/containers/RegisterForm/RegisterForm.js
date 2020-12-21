import getConfig from "next/config";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect } from "react";

import FormInput from "@/components/FormInput/FormInput";
import { useAuth } from "@/context/AuthContext";
import { fetcher } from "@/hooks/useFetch";
import useForm from "@/hooks/useForm";
import registerValidation from "@/validation/registerValidation";

const { publicRuntimeConfig } = getConfig();

function RegisterForm () {
  const router = useRouter();
  const { setAuthUser } = useAuth();

  const stateInit = {
    confirmPassword: "",
    email: "",
    name: "",
    password: "",
    username: ""
  };


  async function userRegistrationHandler () {
    const [
      registerUser,
      registerProfile
    ] = await Promise.all([
      fetcher(`${publicRuntimeConfig.API_URL}/auth/local/register`, {
        body: JSON.stringify({
          email: inputValues.email,
          name: inputValues.name,
          password: inputValues.password,
          profile: inputValues.username,
          user: inputValues.username,
          username: inputValues.username
        }),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "POST"
      }),
      fetcher(`${publicRuntimeConfig.API_URL}/profiles`, {
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
      })
    ]);

    if (registerUser.statusCode === 400 || registerProfile.statusCode === 400) {
      const error = registerUser.message[0].messages[0].message;

      return alert(error);
    }

    setCookie(null, "jwt", registerUser.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/"
    });
    setCookie(null, "user", registerUser.user.username, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/"
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
    className="flex flex-col w-full max-w-xl m-auto text-txt"
    data-testid="register-form"
    onSubmit={submitHandler}
    >
      <label
      className="mb-1 capitalize"
      htmlFor="name"
      >
         name  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </label>
      <FormInput
      id="name"
      name="name"
      onChange={inputChangeHandler}
      type="text"
      value={inputValues.name}
      />
      <label
      className="mb-1 capitalize"
      htmlFor="email"
      >
         email {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </label>
      <FormInput
      id="email"
      name="email"
      onChange={inputChangeHandler}
      type="email"
      value={inputValues.email}
      />
      <label
      className="mb-1 capitalize"
      htmlFor="username"
      >
         username
        <p className={`text-xs
          ${errors.username
            ? "text-red-500"
            : "text-light-text"}
          `}
        >{errors.username ?? "*Must be between 5 and 15 charcters long"}
        </p>
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
        <p className={`text-xs
          ${errors.password
            ? "text-red-500"
            : "text-light-text"}
          `}
        >{errors.password ?? "*Must be between 6 and 16 characters long and contain at least 1 number and 1 uppercase character"}
        </p>
      </label>
      <FormInput
      id="password"
      name="password"
      onChange={inputChangeHandler}
      type="password"
      value={inputValues.password}
      />
      <label
      className="mb-1 capitalize"
      htmlFor="confirmPassword"
      >
         confirm password  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
      </label>
      <FormInput
      id="confirm password"
      name="confirmPassword"
      onChange={inputChangeHandler}
      type="password"
      value={inputValues.confirmPassword}
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
      className="w-2/5 px-4 py-2 m-auto font-bold uppercase border-2 border-pink-200 rounded cursor-pointer text-txt bg-pri focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:bg-sec"
      id="submit"
      name="submit"
      type="submit"
      value="submit"
      />
    </form>
  );
}

export default RegisterForm;
