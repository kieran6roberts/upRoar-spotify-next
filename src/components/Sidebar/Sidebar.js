import React from "react";
import Link from "next/link";
import { GiCompactDisc } from "react-icons/gi";
import { CgProfile, CgPlayTrackNextR } from "react-icons/cg";
import { BiHomeAlt } from "react-icons/bi";
import { useAuth } from "src/context/AuthContext";

const Sidebar = ({ active, logoutHandler }) => {
  const { authUser } = useAuth();
  return(
    <nav role="navigation">
      <div className={`fixed text-txt top-4 left-4 right-4 h-3/5 rounded bg-sec z-20 border border-gray-400 transition duration-200 ease-in 
      ${!active ? "opacity-0 pointer-events-none transform scale-75" : "opacity-1 pointer-events-all transform scale-100"}
      `}>
        <h2 className="py-2 text-center text-md text-txt">
          upRoar
        </h2>
        <div className="h-0.5 w-4/5 bg-gradient-to-r from-pink-400 via-yellow-200 to-purple-400 my-1 mx-auto"/>
        <p className="py-2 text-xs text-center uppercase">
          the place to get lost in the music
        </p>
        <div className="px-8 py-2 md:px-32">
          <p className="mb-4 ml-2 text-gray-400 uppercase text-md">
            {authUser ? "dashboard" : "new users"}
          </p>
          <ul className="flex text-sm text-center uppercase">
            <li className="flex justify-center flex-auto mx-1 md:mx-4">
              <Link href={authUser ? "/dashboard" : "/login"} passHref>
                <a className="flex items-center px-4 py-1 rounded hover:bg-gray-100 hover:text-pri">
                <BiHomeAlt className="mr-2 text-purple-400"/>
                {authUser ? "home" : "login"}
                </a>
              </Link>
            </li>
            <li className="flex justify-center flex-auto mx-1 md:mx-4">
              <Link href={authUser ? `/dashboard/discover` : "/register"} passHref>
                <a className="flex items-center px-2 py-1 rounded hover:bg-gray-100 hover:text-pri">
                  <GiCompactDisc className="mr-2 text-yellow-400" />
                  {authUser ? "discover" : "sign up"}
                </a>
              </Link>
            </li>
            {authUser ? 
            <li className="flex justify-center flex-auto mx-1 md:mx-4">
              <Link href="/dashboard/my-tracks" passHref>
                <a className="flex items-center px-2 py-1 rounded hover:bg-gray-100 hover:text-pri">
                  <CgPlayTrackNextR className="mr-2 text-pink-400" />
                  my tracks
                </a>
              </Link>
            </li>
            : null
            }
          </ul>
          {authUser && 
          <>
          <p className="mt-4 mb-4 ml-2 text-gray-400 uppercase text-md">
              your account
          </p>
          <ul className="flex text-sm text-center uppercase">
              <li className="flex justify-center flex-auto mx-1 md:mx-4">
                <Link href={`/dashboard/users/${authUser}`} passHref>
                  <a className="flex items-center px-2 py-1 rounded hover:bg-gray-100 hover:text-pri">
                    <CgProfile className="mr-2 text-yellow-400" />
                    profile
                  </a>
                </Link>
              </li>
              <li className="flex justify-center flex-auto mx-1 md:mx-4">
                  <a className="flex items-center px-2 py-1 rounded hover:bg-gray-100 hover:text-pri"
                  role="button"
                  onClick={logoutHandler}>
                    <CgProfile className="mr-2 text-yellow-400" />
                    logout
                  </a>
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