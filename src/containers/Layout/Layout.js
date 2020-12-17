import React, { useState } from "react";
import Image from "next/image";
import { destroyCookie, parseCookies } from "nookies";
import Link from "next/link";
import Head from "../../components/Head/Head";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import setTheme from "../../context/ThemeContext";

const Layout = ({ children, title }) => {
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  const { authUser, setAuthUser } = useAuth();
  const [ isDark, setIsDark ] = setTheme();

  const toggleSidebarOpen = () => setSidebarOpen(!sidebarOpen);

  const isLoggedIn = parseCookies(null).jwt;

  const logoutHandler = () => {
    destroyCookie(null, "jwt", {
      path: "/"
    });
    destroyCookie(null, "user", {
      path: "/"
    });
    delete window.__user;
    window.localStorage.setItem("logout", Date.now());
    setAuthUser("");
  };

  return(
    <>
      <Head title={title}/>
      <div className="max-w-full">
        <div className="flex justify-center items-center h-6 bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-200 text-sm text-white font-bold text-center ">
          Welcome to upRoar - discover more!
        </div>
        <nav role="navigation"
        className="sticky top-0 w-full bg-pri z-10 bg-opacity-50">
          <div className="sticky top-0 flex items-center py-2 md:py-4 px-8 md:px-24">
            <Link href={isLoggedIn ? "/dashboard" : "/"} passHref>
              <a className="block">
                <Image
                src="/images/uproar-logo.svg"
                alt="musical notes logo"
                width={30}
                height={30}
                />
              </a>
            </Link>
            <div className="ml-4 md:ml-8">
              <h2 className="text-sm text-txt font-bold">
                upRoar
              </h2>
              <h2 className="text-xs text-txt">
                Music App
              </h2>
            </div>
            <div className="group flex items-center w-16 h-8 ml-auto bg-gray-400 cursor-pointer select-none rounded-2xl p-1"
            onClick={e => {setIsDark(!isDark)}}>
              <div 
              className={`w-6 h-6 cursor-pointer bg-pri py-1 px-2 rounded-full flex justify-center items-center
              ${isDark && "group-transition-transform duration-200 ease-in transform translate-x-8"}`}>
                <Image
                src="/images/toggle-dark.svg"
                alt="moon"
                width={20}
                height={20}/>
              </div>
            </div>
            <div className="">
              <ul className="hidden md:flex mx-8">
                <li className="">
                  <Link href={isLoggedIn ? `/dashboard/users/${authUser}` : "/login"} passHref>
                    <a
                      className="block text-sm text-txt px-4 md:px-6 py-1 border border-gray-500 rounded transition duration-150 ease-in hover:bg-sec hover:text-sec">
                        {!isLoggedIn ? "login" : "profile"}
                      </a>
                  </Link>
                </li>
                <li className="">
                  {!isLoggedIn ? 
                  <Link href="register" passHref>
                    <a
                    onClick={isLoggedIn ? logoutHandler : null}
                    href={isLoggedIn ? null : "/register"}
                    className="block text-sm text-txt px-4 md:px-6 py-1 border border-gray-500 ml-4 rounded transition duration-150 ease-in hover:bg-sec hover:text-sec" >
                      {isLoggedIn ? "logout" : "signUp"}
                    </a>
                  </Link>
                  : 
                    <button
                    onClick={logoutHandler}
                    className="block text-sm text-txt px-4 md:px-6 py-1 border border-gray-500 ml-4 rounded transition duration-150 ease-in hover:bg-sec hover:text-sec">
                      logout
                    </button>
                  }
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Sidebar active={sidebarOpen}
        logoutHandler={logoutHandler} />
        <div className="w-full px-8 md:px-16 relative">
          {children}
          <div
          onClick={toggleSidebarOpen}
          className="group h-12 w-12 flex flex-col justify-center items-center rounded-full border-2 border-gray-500 bg-pri fixed bottom-4 right-8 z-50 cursor-pointer hover:bg-sec transition duration-150ms ease-in">
            <span className="block h-0.5 w-6 bg-txt cursor-pointer group-hover:bg-acc" /> 
            <span className="block h-0.5 w-4 bg-txt my-1 cursor-pointer group-hover:bg-acc" /> 
            <span className="block h-0.5 w-6 bg-txt cursor-pointer group-hover:bg-acc" /> 
          </div>
        </div>
        <Footer />

      </div>
    </>
  )
};

export default Layout;