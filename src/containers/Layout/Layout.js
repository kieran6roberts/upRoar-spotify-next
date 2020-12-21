import Image from "next/image";
import Link from "next/link";
import { destroyCookie, parseCookies } from "nookies";
import React, { useState } from "react";

import Footer from "@/components/Footer/Footer";
import Head from "@/components/Head/Head";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useColorTheme, useUpdateColorTheme } from "@/context/ThemeContext";

function Layout ({ children, title }) {
  const [
    sidebarOpen,
    setSidebarOpen
  ] = useState(false);
  const { authUser, setAuthUser } = useAuth();
  const { isDark } = useColorTheme();
  const { setIsDark } = useUpdateColorTheme();

  function toggleSidebarOpen () {
    return setSidebarOpen(!sidebarOpen);
  }

  const isLoggedIn = parseCookies(null).jwt;

  function logoutHandler () {
    destroyCookie(null, "jwt", {
      path: "/"
    });
    destroyCookie(null, "user", {
      path: "/"
    });
    delete window.__user;
    window.localStorage.setItem("logout", Date.now());
    setAuthUser("");
  }

  return (
    <>
      <Head title={title} />
      <div className="max-w-full">
        <div className="flex items-center justify-center h-6 text-xs font-bold text-center text-white bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-200 ">
            Welcome to upRoar - Discover more!
        </div>
        <nav
        className="sticky top-0 z-10 w-full bg-opacity-50 bg-sec"
        role="navigation"
        >
          <div className="sticky top-0 flex items-center px-8 py-2 md:py-4 md:px-24">
            <Link
            href={isLoggedIn
              ? "/dashboard"
              : "/"}
            passHref
            >
              <a
              aria-label="home page"
              className="block"
              >
                <Image
                alt="musical notes logo"
                height={30}
                src="/images/uproar-logo.svg"
                width={30}
                />
              </a>
            </Link>
            <div className="ml-4 md:ml-8">
              <h2 className="text-sm font-bold text-txt">
                  upRoar
              </h2>
              <h2 className="text-xs text-txt">
                  Music App
              </h2>
            </div>
            <div
            className="flex items-center w-16 h-8 p-1 ml-auto bg-gray-400 cursor-pointer select-none group rounded-2xl"
            onClick={() => {
                setIsDark(!isDark);
              }}
            >
              <div
              className={`w-6 h-6 cursor-pointer bg-pri py-0.5 px-0.5 rounded-full group:transition-transform duration-200 ease-in 
              ${isDark
                ? "transform translate-x-8"
                : "transform translate-x-0"}`}
              id="theme-toggle"
              >
                <Image
                alt="moon"
                height={20}
                src={`${isDark
                  ? "/images/toggle-dark.svg"
                  : "/images/toggle-light.svg"}`}
                width={20}
                />
              </div>
            </div>
            <div className="">
              <ul className="hidden mx-8 uppercase md:flex">
                <li className="">
                  <Link
                  href={isLoggedIn
                    ? `/dashboard/users/${authUser}`
                    : "/login"}
                  passHref
                  >
                    <a className="block px-4 py-1 text-sm transition duration-150 ease-in border border-gray-500 rounded text-txt md:px-6 hover:bg-sec">
                      {!isLoggedIn
                      ? "login"
                      : "profile"}
                    </a>
                  </Link>
                </li>
                <li className="">
                  {!isLoggedIn
                    ? <Link
                    href="register"
                    passHref
                      >
                      <a
                      className="block px-4 py-1 ml-4 text-sm transition duration-150 ease-in bg-pink-300 border border-gray-500 rounded text-txt md:px-6 hover:bg-pink-400"
                      href={isLoggedIn
                        ? null
                        : "/register"}
                      onClick={isLoggedIn
                        ? logoutHandler
                        : null}
                      >
                        {isLoggedIn
                        ? "logout"
                        : "signUp"}
                      </a>
                      </Link>
                    : <button
                    className="block px-4 py-1 ml-4 text-sm uppercase transition duration-150 ease-in border border-gray-500 rounded text-txt md:px-6 hover:bg-sec"
                    onClick={logoutHandler}
                    type="button"
                      >
                       logout
                      </button>}
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Sidebar
        active={sidebarOpen}
        logoutHandler={logoutHandler}
        />
        <div className="relative w-full px-4 lg:px-8 xl:px-16">
          {children}
          <div
          className="fixed z-50 flex flex-col items-center justify-center w-12 h-12 transition ease-in border-2 border-gray-500 rounded-full cursor-pointer group bg-pri bottom-2 md:bottom-4 right-2 md:right-8 hover:bg-sec duration-150ms"
          onClick={toggleSidebarOpen}
          >
            <span className="block h-0.5 w-6 bg-txt cursor-pointer group-hover:bg-acc" />
            <span className="block h-0.5 w-4 bg-txt my-1 cursor-pointer group-hover:bg-acc" />
            <span className="block h-0.5 w-6 bg-txt cursor-pointer group-hover:bg-acc" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
