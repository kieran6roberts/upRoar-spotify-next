import React from "react"

const FormInput = ({ id, type, name, value }) => {
  return(
    <input 
    id={id} 
    type={type} 
    name={name} 
    value={value}
    className="py-1 px-4 mb-8 border rounded" />
  )
};

export default FormInput;