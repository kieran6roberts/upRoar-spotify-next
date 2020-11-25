import React from "react";
import NextHead from "next/head";

const Head = ({ title, description }) => {
  return(
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
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