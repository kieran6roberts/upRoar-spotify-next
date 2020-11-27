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
  const [ isAuth, setIsAuth ] = useState(false);

  const router = useRouter();
  const { pathname, query } = router;

  const checkIsUserAuth = async () => {
    if(typeof window === "undefined") return;

    const jwt = parseCookies("jwt");

    if (Object.keys(jwt).length === 0) {
      if (!validPublicPaths.includes(pathname)) {
        router.push("/login");
      }
    } 
        else {
      const response = await fetch(`${publicRuntimeConfig.API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt.jwt}`
        }
      });

      const data = await response.json();
      console.log(data);

      if(!data) {
        destroyCookie("jwt");
        setIsAuth(false);
        setAuthUser(null);
        return null;
      }
        else {
          setIsAuth(true);
          setAuthUser(data.username);
        }
    }
  };

  useEffect(() => {
    checkIsUserAuth();
    console.log(authUser);
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, isAuth, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;

/*
const setHeaders = ({ type = "GET", authToken = null, body }) => {
  if (authToken) {
    return {
      method: type,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(body)
    };
  }
    else {
      return {
        method: type,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      };
    }
};

const fetch = async ({ path = null, params = null, options }) => {
  try {
    const response = await fetch(`${publicRuntimeConfig.API_URL}/${path}/${params}`, options);
    const data = await response.json();
    return data;
  }
    catch(err) {
      console.error(err);
    }
};
*/