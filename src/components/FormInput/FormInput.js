import React from "react";

function FormInput ({ id, type, name, value, onChange }) {
  return <input
  className="px-4 py-2 mb-8 text-black rounded ring-2 ring-gray-500 ring-opacity-50 focus:outline-none focus:ring-3 focus:ring-indigo-400"
  id={id}
  name={name}
  onChange={onChange}
  styling=""
  type={type}
  value={value}
         />;
}

export default FormInput;
