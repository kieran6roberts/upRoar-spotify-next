import getConfig from "next/config";
import { parseCookies } from "nookies";

import FormInput from "@/components/FormInput/FormInput";
import useForm from "@/hooks/useForm";
import { fetcher } from "@/utility/fetcher";
import editUserValidation from "@/validation/editUserValidation";

const { publicRuntimeConfig } = getConfig();

function EditUserForm () {
  const stateInit = {
    email: ""
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
        body: JSON.stringify(inputValues),
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
    validate: editUserValidation,
    submitFunc: updateUserHandler });

  return (
    <form
    className="flex flex-col w-full max-w-xl text-txt"
    data-testid="edit-form"
    method="POST"
    onSubmit={submitHandler}
    >
      <label
      className="mb-1 capitalize"
      htmlFor="email"
      >
         new email
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </label>
      <FormInput
      id="email"
      name="email"
      onChange={inputChangeHandler}
      type="email"
      value={inputValues.email}
      />
      <input
      className="px-4 py-2 font-bold uppercase border border-pink-300 rounded cursor-pointer text-txt bg-pri hover:bg-sec focus:outline-none focus:ring-2 focus:ring-purple-400"
      id="submit"
      name="submit"
      type="submit"
      value="submit"
      />
      {submitting && !errors.email && <p className="mt-4 text-sm text-green-500 uppercase">Your email was successfully updated!</p>}
    </form>
  );
}

export default EditUserForm;
