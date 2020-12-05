import React from "react";
import Link from "next/link";
import { GiCompactDisc } from "react-icons/gi";
import { CgProfile, CgPlayTrackNextR } from "react-icons/cg";
import { BiHomeAlt } from "react-icons/bi";
import { useAuth } from "src/context/AuthContext";

const Sidebar = ({ active }) => {
  const { authUser } = useAuth();
  return(
    <nav role="navigation">
      <div className={`fixed text-txt top-4 left-4 right-4 bottom-32 rounded z-10 bg-pri border border-gray-400
      ${!active ? "invisible transition duration-200 ease-in opacity-0 transform scale-75" : "visible transition duration-200 ease-in opacity-1 transform scale-100"}
      `}>
        <h2 className="text-lg text-txt text-center py-2">
          upRoar
        </h2>
        <div className="h-0.5 w-4/5 bg-gray-300 my-1 mx-auto"/>
        <p className="text-md text-center py-2">
          the place to get lost in the music
        </p>
        <div className="px-8 md:px-32 py-2">
          <p className="ml-2 mb-4 text-lg text-gray-400 uppercase">
            {authUser ? "dashboard" : "new users"}
          </p>
          <ul className="flex text-sm text-center">
            <li className="flex-auto mx-1 md:mx-4">
              <Link href={authUser ? "/dashboard" : "/login"} passHref>
                <a className="flex items-center capitalize py-1 px-4 rounded hover:bg-gray-100 hover:text-pri">
                <BiHomeAlt className="mr-2 text-purple-400"/>
                {authUser ? "home" : "login"}
                </a>
              </Link>
            </li>
            <li className="flex-auto mx-1 md:mx-4">
              <Link href={authUser ? `/dashboard/discover` : "/register"} passHref>
                <a className="flex items-center capitalize py-1 px-2 rounded hover:bg-gray-100 hover:text-pri">
                  <GiCompactDisc className="mr-2 text-yellow-400" />
                {authUser ? "discover" : "sign up"}
                </a>
              </Link>
            </li>
            <li className="flex-auto mx-1 md:mx-4">
              <Link href={authUser ? `/dashboard/my-tracks` : ""} passHref>
                <a className="flex items-center capitalize py-1 px-2 rounded hover:bg-gray-100 hover:text-pri">
                  <CgPlayTrackNextR className="mr-2 text-pink-400" />
                {authUser ? "my tracks" : null}
                </a>
              </Link>
            </li>
          </ul>
          {authUser && 
          <>
          <p className="ml-2 mb-4 text-lg mt-4 text-gray-400 uppercase">
              your account
          </p>
          <ul className="flex text-sm text-center">
              <li className="mx-1 md:mx-4">
                <Link href={`/dashboard/users/${authUser}`} passHref>
                  <a className="flex items-center capitalize py-1 px-2 rounded hover:bg-gray-100 hover:text-pri">
                    <CgProfile className="mr-2 text-yellow-400" />
                    profile
                  </a>
                </Link>
              </li>
          </ul>
          </>
          }
        </div>
      </div>
    </nav>
  )
};

export default Sidebar;