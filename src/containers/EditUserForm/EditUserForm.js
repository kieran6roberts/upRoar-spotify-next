import { fetcher } from "src/hooks/useFetch";
import { parseCookies } from "nookies";
import getConfig from "next/config";
import editUserValidation from "src/validation/editUserValidation";
import FormInput from "src/components/FormInput/FormInput";
import useForm from "src/hooks/useForm";

const { publicRuntimeConfig } = getConfig();

const EditUserForm = () => {
    const stateInit = {
        email: ""
      };

    const updateUserHandler = async () => {
        const jwt = parseCookies(null).jwt;
        try {
          const myProfile = await fetcher(`${publicRuntimeConfig.API_URL}/users/me`, {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`
            },
          });
          const resetInfo = await fetcher(`${publicRuntimeConfig.API_URL}/users/${myProfile.id}`, {
            method: "PUT",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify(inputValues)
          });
        }  
          catch(err) {
            console.error(err);
        }
      };

    const { inputValues, 
        errors,
        submitting,
        inputChangeHandler, 
        submitHandler } = useForm({ stateInit, validate: editUserValidation, submitFunc: updateUserHandler });

    return(
        <>
        <form
        method="POST"
        onSubmit={submitHandler}
        className="flex flex-col w-full max-w-xl text-txt"
        data-testid="edit-form">
            <label 
            htmlFor="email" 
            className="mb-1 capitalize">
                new email
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </label>
            <FormInput
            id="email"
            type="email"
            value={inputValues.email}
            onChange={inputChangeHandler}
            name="email"  />
            <input
            id="submit"
            type="submit"
            name="submit"
            value="submit"
            className="px-4 py-2 font-bold uppercase border border-pink-300 rounded cursor-pointer text-txt bg-pri hover:bg-sec focus:outline-none focus:ring-2 focus:ring-purple-400" />
            {submitting && !errors.email && <p className="mt-4 text-sm text-green-500 uppercase">Your email was successfully updated!</p>}
        </form>
        </>
    )
};

export default EditUserForm;