import React from "react";
import Link from "next/link";
import getConfig from "next/config";
import { useRouter } from "next/router";
import FormInput from "../../components/FormInput/FormInput";
import useForm from "../../hooks/useForm";
import registerValidation from "../../registerValidation";
import { useAuth } from "../../context/AuthContext";
import { setCookie } from "nookies";

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
    const userRegisterInfo = {
      name: inputValues.name,
      email: inputValues.email,
      username: inputValues.username,
      password: inputValues.password,
      profile: inputValues.username,
      user: inputValues.username
    };

    try {
      const register = await fetch(`${publicRuntimeConfig.API_URL}/auth/local/register`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userRegisterInfo)
      })

      const registerResponse = await register.json();


      if (registerResponse.statusCode === 400) {
        const error = registerResponse.message[0].messages[0].message;
        return alert(error);
      }
        else {
          setCookie(null, "jwt", registerResponse.jwt, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          });
          setCookie(null, "user", registerResponse.user.username, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          });
          setAuthUser(registerResponse);
          router.push(`dashboard/users/${registerResponse.user.username}`);
        }
    }
      catch(err) {
        console.error("there was a problem creating user", err);
      }

    //router.push("/profile/user");
  };

  const [ 
    inputValues, 
    errors, 
    submitting, 
    inputChangeHandler, 
    submitHandler ] = useForm({ stateInit, validate: registerValidation, submitFunc: userRegistrationHandler });

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
      className="py-2 px-4 rounded text-pri font-bold capitalize bg-light-bg cursor-pointer hover:bg-light-bg focus:outline-none focus:ring-2 focus:ring-pri focus:ring-opacity-50" />
    </form>
  )
};

export default RegisterForm;