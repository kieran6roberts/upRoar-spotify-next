import React from "react"

const FormInput = ({ id, type, name, value, onChange }) => {
  return(
    <input 
    id={id} 
    type={type} 
    name={name} 
    value={value}
    styling=""
    onChange={onChange}
    className="px-4 py-2 mb-8 text-black rounded ring-2 ring-gray-500 ring-opacity-50 focus:outline-none focus:ring-3 focus:ring-indigo-400" />
  )
};

export default FormInput;