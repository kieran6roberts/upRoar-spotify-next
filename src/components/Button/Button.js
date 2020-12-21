import Link from "next/link";
import React from "react";

function Button ({ children, extra, route }) {
  return (
    <Link href={route}>
      <a
      className={`block text-xs uppercase text-center px-4 my-2 md:px-6 py-2 rounded transition duration-150 ease-in
      ${extra && extra}`}
      >
        {children}
      </a>
    </Link>
  );
}

export default Button;
