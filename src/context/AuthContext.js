import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import getConfig from "next/config";
import fetch from "isomorphic-fetch";

const { publicRuntimeConfig } = getConfig();


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [ authUser, setAuthUser ] = useState(null);
  const [ isAuth, setIsAuth ] = useState(false);

  const checkIsUserAuth = async () => {
    const token = Cookies.get("token");

    if (token) {
      const response = await fetch(`${publicRuntimeConfig.API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json();
      console.log(data);

      if(!data) {
        Cookies.remove("token");
        setIsAuth(false);
        setAuthUser(null);
        return null;
      }
        else {
          setIsAuth(true);
          setAuthUser(data);
        }
    }
  };

  useEffect(() => {
    checkIsUserAuth();
    console.log(authUser);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
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