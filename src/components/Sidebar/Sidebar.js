import React from "react";

const Sidebar = ({ active }) => {
  return(
    <nav role="navigation">
      <div className={`fixed top-4 left-4 right-4 bottom-32 rounded z-10 bg-light-bg border border-gray-400
      ${!active ? "invisible transition duration-200 ease-in opacity-0 transform scale-75" : " visible transition duration-200 ease-in opacity-1 transform scale-100"}
      `}>
      </div>
    </nav>
  )
};

export default Sidebar;