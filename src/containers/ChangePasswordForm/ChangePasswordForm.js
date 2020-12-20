import { fetcher } from "src/hooks/useFetch";
import { parseCookies } from "nookies";
import getConfig from "next/config";
import passwordValidation from "src/validation/passwordValidation";
import FormInput from "src/components/FormInput/FormInput";
import useForm from "src/hooks/useForm";

const { publicRuntimeConfig } = getConfig();

const ChangePasswordForm = () => {
    const stateInit = {
        password: "",
        confirmPassword: ""
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
            body: JSON.stringify({ password: inputValues.password })
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
        submitHandler } = useForm({ stateInit, validate: passwordValidation, submitFunc: updateUserHandler });

    return(
        <>
        <form
        method="POST"
        onSubmit={submitHandler}
        className="flex flex-col w-full max-w-xl text-txt"
        data-testid="edit-form">
            <label 
            htmlFor="password" 
            className="mb-1 capitalize">
                new password
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </label>
            <FormInput
            id="password"
            type="password"
            value={inputValues.password}
            onChange={inputChangeHandler}
            name="password"  />
            <label 
            htmlFor="confirmPassword" 
            className="mb-1 capitalize">
                confirm new password
                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
            </label>
            <FormInput
            id="confirmPassword"
            type="password"
            value={inputValues.confirmPassword}
            onChange={inputChangeHandler}
            name="confirmPassword"  />
            <input
            id="submit"
            type="submit"
            name="submit"
            value="submit"
            className="px-4 py-2 font-bold uppercase border border-pink-300 rounded cursor-pointer text-txt bg-pri hover:bg-sec focus:outline-none focus:ring-2 focus:ring-purple-400" />
            {submitting && !errors.password && <p className="mt-4 text-sm text-green-500 uppercase">Your password was successfully updated!</p>}
        </form>
        </>
    )
};

export default ChangePasswordForm;