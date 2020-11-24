import React from "react";
import NextHead from "next/head";

const Head = ({ title, description }) => {
  return(
    <NextHead>
      <meta 
      name="description" 
      content={description || ""} />
      <title>
        {title}
      </title>
    </NextHead>
  )
};

export default Head;