import React from "react";
import Link from "next/link";

const Sidebar = ({ active }) => {
  return(
    <nav role="navigation">
      <div className={`fixed top-4 left-4 right-4 bottom-32 rounded z-10 bg-white border border-gray-400
      ${!active ? "invisible transition duration-200 ease-in opacity-0 transform scale-75" : " visible transition duration-200 ease-in opacity-1 transform scale-100"}
      `}>
        <h2 className="text-lg text-center text-pri py-2">
          upRoar
        </h2>
        <div className="h-0.5 w-4/5 bg-gray-100 my-1 mx-auto"/>
        <p className="text-sm text-center py-2">
          the place to get lost in the music
        </p>
        <div className="px-8 py-2">
          <p className="ml-2 mb-4 uppercase">
            new users
          </p>
          <ul className="flex">
            <li>
              <Link href="/login">
                <a className="py-1 px-2">
                  login
                </a>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <a className="py-1 px-2">
                  sign up
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};

export default Sidebar;