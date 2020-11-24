import React, { useState, useEffect } from "react";
import Head from "src/components/Head/Head";
import Nav from "src/components/Nav/Nav";
import Footer from "src/components/Footer/Footer";
import Sidebar from "src/components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  const [ theme, setTheme ] = useState(false);
  const [ sidebarOpen, setSidebarOpen ] = useState(false);

  const toggleSidebarOpen = () => setSidebarOpen(!sidebarOpen);
  const toggleTheme = () => setTheme(!theme);

  return(
    <>
      <Head />
      <Nav 
      theme={theme}
      toggleTheme={toggleTheme} />
      <Sidebar active={sidebarOpen} />
      <div className="w-full px-8 md:px-16 relative">
        {children}
        <div
        onClick={toggleSidebarOpen}
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