import React from "react";

const Button = ({ children, width, bg, clr, hovClr, hovBg, route }) => {
  return (
    <a href={route}
    className={`block text-sm px-4 md:px-6 py-2 border border-light-text rounded transition duration-150 ease-in
    ${width && width}
    ${bg && bg}
    ${clr && clr}
    ${hovClr && hovClr}
    ${hovBg && hovBg}`} >
      {children}
    </a>
  )
};

export default Button;