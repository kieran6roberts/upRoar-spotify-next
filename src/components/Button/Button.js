import Link from "next/link";
import React from "react";

function Button ({ children, extra, route }) {
  return (
    <Link href={route}>
      <a
      className={`block font-bold text-xs uppercase text-center px-4 my-2 lg:px-6 2xl:py-4 2xl:px-12 py-2 rounded transition duration-150 ease-in focus:outline-none focus:ring-2 focus:ring-pink-200
      ${extra && extra}`}
      >
        {children}
      </a>
    </Link>
  );
}

export default Button;
