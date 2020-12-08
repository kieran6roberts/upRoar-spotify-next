const editUserValidation = values => {
    let errors = {};
    const emailExpPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (!values.username.trim()) {
      errors.username = "Username required!";
    }
      else if (values.username.length <= 4 || values.username.length >= 16) {
        errors.username = "Username length must be between 5 and 15 characters long!"
      }
  
    if (!values.email) {
      errors.email = "Email required!"
    }
      else if (!emailExpPattern.test(values.email)) {
      errors.email = "Invalid email address! Please enter a valid address"
    }
  
    return errors;
  };
  
  export default editUserValidation;