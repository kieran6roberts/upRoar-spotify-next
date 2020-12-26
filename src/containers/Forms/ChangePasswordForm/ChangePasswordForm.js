import getConfig from "next/config";
import { parseCookies } from "nookies";

import FormInput from "@/components/FormInput/FormInput";
import useForm from "@/hooks/useForm";
import { fetcher } from "@/utility/fetcher";
import passwordValidation from "@/validation/passwordValidation";

const { publicRuntimeConfig } = getConfig();

function ChangePasswordForm () {
  const stateInit = {
    confirm: "",
    password: ""
  };

  async function updateUserHandler () {
    const { jwt } = parseCookies(null);

    try {
      const myProfile = await fetcher(`${publicRuntimeConfig.API_URL}/users/me`, {
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json"
        },
        method: "GET"
      });

      await fetcher(`${publicRuntimeConfig.API_URL}/users/${myProfile.id}`, {
        body: JSON.stringify({ password: inputValues.password }),
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json"
        },
        method: "PUT"
      });
    } catch (err) {
      console.error(err);
    }
  }

  const { inputValues,
    errors,
    submitting,
    inputChangeHandler,
    submitHandler } = useForm({ stateInit,
    validate: passwordValidation,
    submitFunc: updateUserHandler });

  return (
    <form
    className="flex flex-col w-full max-w-xl text-txt"
    method="POST"
    onSubmit={submitHandler}
    >
      <label
      className="mb-1 capitalize"
      htmlFor="password"
      >
         new password
        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
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
      htmlFor="confirm"
      >
         confirm new password
        {errors.confirm && <p className="text-xs text-red-500">{errors.confirm}</p>}
      </label>
      <FormInput
      id="confirm"
      name="confirm"
      onChange={inputChangeHandler}
      type="password"
      value={inputValues.confirm}
      />
      <input
      className="px-4 py-2 font-bold uppercase border border-pink-300 rounded cursor-pointer text-txt bg-pri hover:bg-sec focus:outline-none focus:ring-2 focus:ring-purple-400"
      id="submit"
      name="submit"
      type="submit"
      value="submit"
      />
      {submitting && !errors.password && <p className="mt-4 text-sm text-green-500 uppercase">Your password was successfully updated!</p>}
    </form>
  );
}

export default ChangePasswordForm;
