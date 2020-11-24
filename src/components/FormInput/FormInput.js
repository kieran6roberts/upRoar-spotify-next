import React from "react"

const FormInput = ({ id, type, name, value }) => {
  return(
    <input 
    id={id} 
    type={type} 
    name={name} 
    value={value}
    className="py-2 px-4 mb-8 ring-2 ring-gray-500 ring-opacity-50 rounded focus:outline-none focus:ring-pri" />
  )
};

export default FormInput;