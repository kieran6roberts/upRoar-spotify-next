const userSearchValidation = values => {
    let errors = {};
  
    if(!values.search.trim() === "" || !typeof(values.search) === "string") {
      errors.username = "Search for something!";
    }

    return errors;
  };
  
  export default userSearchValidation;