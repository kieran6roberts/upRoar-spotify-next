import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "src/components/Head/Head";
import Footer from "src/components/Footer/Footer";
import Sidebar from "src/components/Sidebar/Sidebar";

const Layout = ({ children, title }) => {
  const [ theme, setTheme ] = useState(false);
  const [ sidebarOpen, setSidebarOpen ] = useState(false);

  const toggleSidebarOpen = () => setSidebarOpen(!sidebarOpen);
  const toggleTheme = () => setTheme(!theme);

  return(
    <>
      <Head title={title}/>
      <nav role="navigation">
        <div className="flex items-center py-2 md:py-4 px-8 md:px-16 border-b-2 border-gray-50">
          <Link href="/">
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
            <h2 className="text-sm font-bold">
              upRoar
            </h2>
            <h2 className="text-xs">
              Music App
            </h2>
          </div>
          <div className="ml-auto">
            <ul className="hidden md:flex mr-8">
              <li className="">
                <Link href="/login">
                  <a   
                    href="/login"
                    className="block text-sm px-4 md:px-6 py-1 border border-transparent rounded transition duration-150 ease-in hover:bg-gray-50   ">
                      login
                    </a>
                </Link>
              </li>
              <li className="">
                <Link href="/register">
                  <a   
                  href="/register"
                  className="block text-sm px-4 md:px-6 py-1  border border-light-text ml-4 rounded transition duration-150 ease-in hover:bg-light-text hover:text-light-bg">
                    signUp
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div 
          onClick={() => toggleTheme()}
          className="group w-16 h-8 bg-gray-200 cursor-pointer select-none border rounded p-1 relative">
            <div
            className={`w-8 h-6 cursor-pointer bg-white py-2 px-3 rounded flex justify-center items-center absolute top-0.5 left-0.5
            ${theme ? "group-transition-transform duration-200 ease-in transform translate-x-6"
                    : "group-transition-transform duration-200 ease-in transofrm -translate-x-6"}
            `}>
              <Image
              src="/images/toggle-dark.svg"
              alt="moon"
              width={20}
              height={20}/>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar active={sidebarOpen} />
      <div className="w-full px-8 md:px-16 relative">
        {children}
        <div
        onClick={() => toggleSidebarOpen()}
        className="group h-12 w-12 flex flex-col justify-center items-center rounded-full border-2 border-pri bg-pri fixed bottom-4 right-8 cursor-pointer hover:bg-white transition 150ms ease-in">
          <span className="block h-0.5 w-6 bg-white cursor-pointer group-hover:bg-pri" /> 
          <span className="block h-0.5 w-4 my-1 bg-white cursor-pointer group-hover:bg-pri" /> 
          <span className="block h-0.5 w-6 bg-white cursor-pointer group-hover:bg-pri" /> 
        </div>
      </div>
      <Footer />
    </>
  )
};

export default Layout;