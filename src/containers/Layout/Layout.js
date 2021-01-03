import Image from "next/image";
import Link from "next/link";
import { destroyCookie, parseCookies } from "nookies";
import React, { useEffect, useState } from "react";

import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useColorTheme, useUpdateColorTheme } from "@/context/ThemeContext";

function Layout ({ children }) {
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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (isDark) {
      const toggle = document.querySelector("#theme-toggle");

      toggle.classList.add("translate-x-8");
    }
  }, []);

  return (
      <div className="max-w-full">
        <div className="flex items-center justify-center h-6 text-xs font-bold text-center text-white bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-200">
            Welcome to upRoar - Discover more!
        </div>
        <div className="flex flex-col justify-start min-h-screen">
          <nav
          className="sticky top-0 z-10 w-full bg-opacity-50 bg-pri"
          role="navigation"
          >
            <div className="sticky top-0 flex items-center px-4 py-2 md:py-4 md:px-16 lg:px-20 2xl:py-12 2xl:px-32">
              <Link
              href={isLoggedIn
                ? "/dashboard"
                : "/"}
              passHref
              >
                <a
                aria-label="home page"
                className="block focus:outline-none focus:ring-2 focus:ring-pink-300"
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
              <button
              className="flex items-center w-16 h-8 p-1 ml-auto bg-gray-400 cursor-pointer select-none group rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300"
              onClick={() => {
                  setIsDark(!isDark);
                }}
              type="button"
              >
                <div
                className={`w-6 h-6 cursor-pointer bg-pri py-0.5 px-0.5 rounded-full group:transition-transform duration-200 ease-in transform 
                ${isDark
                  ? "translate-x-8"
                  : "translate-x-0"}`}
                id="theme-toggle"
                >
                  {isDark
                  ? <Image
                  alt="moon indicating dark mode"
                  height={20}
                  src="/images/toggle-dark.svg"
                  width={20}
                    />
                  : <Image
                  alt="sun indicating light mode"
                  height={20}
                  src="/images/toggle-light.svg"
                  width={20}
                    />}
                </div>
              </button>
              <div className="">
                <ul className="hidden mx-8 uppercase md:flex">
                  <li className="">
                    {isLoggedIn
                    ? <Link
                    href={`/dashboard/users/${authUser}`}
                    passHref
                      >
                      <a className="block px-4 py-1 text-sm transition duration-150 ease-in border border-gray-500 rounded text-txt md:px-6 hover:bg-pink-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-pink-300">
                        profile
                      </a>
                      </Link>
                    : <Link
                    href="/login"
                    passHref
                      >
                      <a className="block px-4 py-1 text-sm transition duration-150 ease-in border border-gray-500 rounded text-txt md:px-6 hover:bg-pink-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-pink-300">
                        login
                      </a>
                      </Link>}
                  </li>
                  <li className="">
                    {!isLoggedIn
                      ? <Link
                      href="/register"
                      passHref
                        >
                        <a
                        className="block px-4 py-1 ml-4 text-sm transition duration-150 ease-in bg-pink-300 border border-gray-500 rounded text-txt md:px-6 hover:bg-pink-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
                        >
                          sign up
                        </a>
                        </Link>
                      : <button
                      className="block px-4 py-1 ml-4 text-sm uppercase transition duration-150 ease-in border border-gray-500 rounded text-txt md:px-6 hover:bg-pink-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
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
          <div className="relative w-full px-4 pb-16 2xl:pb-56 md:px-16 lg:px-20 2xl:px-32">
            {children}
            <button
            className="fixed z-50 flex flex-col items-center justify-center w-16 h-16 transition ease-in rounded-full cursor-pointer bg-txt bg-opacity-80 2xl:w-24 2xl:h-24 group bottom-4 md:bottom-6 2xl:bottom-24 2xl:right-32 right-4 md:right-8 hover:bg-opacity-90 duration-150ms focus:outline-none focus:ring-2 focus:ring-pink-300"
            data-testid="sidebar-toggle"
            onClick={toggleSidebarOpen}
            type="button"
            >
              <span className="block h-0.5 w-4/6 bg-pri cursor-pointer group-hover:bg-acc" />
              <span className="block h-0.5 w-2/4 bg-pri my-2 2xl:my-3 cursor-pointer group-hover:bg-acc" />
              <span className="block h-0.5 w-4/6 bg-pri cursor-pointer group-hover:bg-acc" />
            </button>
          </div>
          {!authUser && <Footer />}
        </div>
      </div>
  );
}

export default Layout;
