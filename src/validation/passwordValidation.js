function resetEmailValidation (values) {
  const errors = {};

  if (!values.password || typeof values.password !== "string") {
    errors.password = "Password required!";
  }

  if (!values.confirm || typeof values.confirm !== "string") {
    errors.confirm = "Password required!";
  } else if (values.password !== values.confirm || typeof values.confirm !== "string") {
    errors.confirm = "Passwords do not match! Try again";
  }


  return errors;
}

export default resetEmailValidation;
