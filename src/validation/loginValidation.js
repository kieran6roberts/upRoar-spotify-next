const loginValidation = values => {
  let errors = {};

  if(!values.username.trim() || typeof values.username !== "string") {
    errors.username = "Username required!";
  }

  if(!values.password || typeof values.password !== "string") {
    errors.password  = "Password required!";
  }
  return errors;
};

export default loginValidation;