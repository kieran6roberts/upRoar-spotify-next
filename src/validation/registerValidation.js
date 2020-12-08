const registerValidation = values => {
  let errors = {};
  const emailExpPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordExpPattern = /^(?=.*\d)()(?=.*[A-Z]).{6,16}$/;

  if (!values.name || typeof values.name !== "string") {
    errors.name = "Name required!";
  }

  if (!values.username.trim() || typeof values.username !== "string") {
    errors.username = "Username required!";
  }
    else if (values.username.length <= 4 || values.username.length >= 16) {
      errors.username = "Username length must be between 5 and 15 characters long!"
    }

  if (!values.password || typeof values.password !== "string") {
    errors.password  = "Password required!";
  }

    else if (!passwordExpPattern.test(values.password)) {
      errors.password = "Password must be between 6 and 16 characters long and contain at least 1 number and 1 uppercase character!"
    }

  if (!values.confirmPassword || typeof values.confirmPassword !== "string") {
    errors.confirmPassword = "Password required!"
  }
    else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match! Try again";
  }

  if (!values.email || typeof values.email !== "string") {
    errors.email = "Email required!"
  }
    else if (!emailExpPattern.test(values.email)) {
    errors.email = "Invalid email address! Please enter a valid address"
  }

  return errors;
};

export default registerValidation;