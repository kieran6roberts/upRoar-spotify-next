import Image from "next/image";
import React from "react";

function Footer () {
  return (
    <footer className="p-8 mt-4 border-t-2 border-gray-100 xl:mt-auto">
      <p className="font-bold text-center text-md text-txt">
          upRoar Music App
      </p>
      <div className="flex items-center justify-center">
        <p className="mr-2 capitalize text-txt">
            powered by
        </p>
        <Image
        alt="spotify logo"
        height={70}
        src="/images/spotify-seeklogo.com.svg"
        width={70}
        />
      </div>
      <p className="text-xs text-center text-txt">
          created and designed by Kieran Roberts
      </p>
    </footer>
  );
}

export default Footer;
