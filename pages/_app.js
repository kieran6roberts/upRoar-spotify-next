import "src/App.css";
import React from "react";
import AuthProvider from "src/context/AuthContext";


const MyApp = ({ Component, pageProps }) => {
  
  return (
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
