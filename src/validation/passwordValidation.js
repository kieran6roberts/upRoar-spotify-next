function resetEmailValidation (values) {
  const errors = {};

  if (!values.password || typeof values.password !== "string") {
    errors.password = "Password required!";
  }

  if (!values.confirmPassword || typeof values.confirmPassword !== "string") {
    errors.confirmPassword = "Password required!";
  } else if (values.password !== values.confirmPassword || typeof values.confirmPassword !== "string") {
    errors.confirmPassword = "Passwords do not match! Try again";
  }


  return errors;
}

export default resetEmailValidation;
