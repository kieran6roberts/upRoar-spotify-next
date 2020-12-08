import EditUserValidation from "src/validation/editUserValidation";
import FormInput from "src/components/FormInput/FormInput";
import useForm from "src/hooks/useForm";

const EditUserForm = () => {
    const stateInit = {
        username: "",
        email: ""
      };

    return(
        <form
        method="POST"
        className="flex text-txt flex-col w-full max-w-xl"
        data-testid="edit-form">
            <label 
            htmlFor="username" 
            className="mb-1 capitalize">
                username  
            </label>
            <FormInput
            id="username"
            type="text"
            name="username"/>
            <label 
            htmlFor="password" 
            className="mb-1 capitalize">
                password
            </label>
            <FormInput
            id="email"
            type="email"
            name="email"  />
            <input
            id="submit"
            type="submit"
            name="submit"
            value="submit"
            className="py-2 px-4 rounded text-txt font-bold uppercase bg-pri border border-gray-500 rounded cursor-pointer hover:bg-sec focus:outline-none focus:ring-2 focus:ring-sec focus:ring-opacity-50" />
        </form>
    )
};

export default EditUserForm;