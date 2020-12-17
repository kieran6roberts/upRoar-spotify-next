import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t-2 border-gray-100 p-8 mt-20">
      <p className="text-md text-txt font-bold text-center">
        upRoar Music App
      </p>
      <div className="flex justify-center items-center">
        <p className="mr-2 text-txt capitalize">
          powered by 
        </p>
          <Image 
          src="/images/spotify-seeklogo.com.svg"
          alt="spotify logo"
          height={70}
          width={70} />
      </div>
      <p className="text-xs text-txt text-center">
        created and designed by Kieran Roberts
      </p>
    </footer>
  )
};

export default Footer;