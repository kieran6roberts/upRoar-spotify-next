import React, { createContext, useState, useContext, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import getConfig from "next/config";
import fetch from "isomorphic-fetch";
import { useRouter } from "next/router";
import { validPublicPaths } from "../containers/AuthRoutes/routes";

const { publicRuntimeConfig } = getConfig();

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [ authUser, setAuthUser ] = useState(null);

  const router = useRouter();
  const { pathname } = router;

  const checkIsUserAuth = async () => {
    if (typeof window === "undefined") return;

    const jwt = parseCookies(null).jwt;

    if (!jwt) {
      console.log("empty jwt");
      if (!validPublicPaths.includes(pathname)) {
        console.log("not a valid public path");
        return router.push("/login");
      }
    } 
        else {
      const response = await fetch(`${publicRuntimeConfig.API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      const data = await response.json();

      if(!data) {
        destroyCookie(null, "jwt", {
          path: "/"
        });
        setAuthUser(null);
        return null;
      }
        else {
          setAuthUser(data.username);
        }
    }
  };

  useEffect(() => {
    checkIsUserAuth();
  }, [ authUser ]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;