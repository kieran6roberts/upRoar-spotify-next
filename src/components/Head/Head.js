import NextHead from "next/head";
import React from "react";

function Head ({ title, description }) {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <meta
      content="width=device-width, initial-scale=1"
      name="viewport"
      />
      <meta
      content={description || ""}
      name="description"
      />
      <title>
        {title}
      </title>
    </NextHead>
  );
}

export default Head;
