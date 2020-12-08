const editUserValidation = values => {
    let errors = {};
    const emailExpPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (!values.email || typeof values.email !== string) {
      errors.email = "Email required!"
    }
      else if (!emailExpPattern.test(values.email)) {
      errors.email = "Invalid email address! Please enter a valid address"
    }
  
    return errors;
  };
  
  export default editUserValidation;