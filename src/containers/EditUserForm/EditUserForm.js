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
          console.log(myProfile);
          const resetInfo = await fetcher(`${publicRuntimeConfig.API_URL}/users/${myProfile.id}`, {
            method: "PUT",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify(inputValues)
          });
          console.log(resetInfo);
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
        className="flex text-txt flex-col w-full max-w-xl"
        data-testid="edit-form">
            <label 
            htmlFor="email" 
            className="mb-1 capitalize">
                email
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
            className="py-2 px-4 rounded text-txt font-bold uppercase bg-pri border border-gray-500 rounded cursor-pointer hover:bg-sec focus:outline-none focus:ring-2 focus:ring-sec focus:ring-opacity-50" />
            {submitting && !errors.email && <p className="text-sm text-green-500 uppercase mt-4">Your email was successfully changed!</p>}
        </form>
        </>
    )
};

export default EditUserForm;