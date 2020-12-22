import getConfig from "next/config";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import React, { createContext, useContext, useEffect, useState } from "react";

import { authSpotify, validPublicPaths } from "@/containers/AuthRoutes/routes";
import { fetcher } from "@/utility/fetcher";

const { publicRuntimeConfig } = getConfig();

const AuthContext = createContext();

export function useAuth () {
  return useContext(AuthContext);
}

function AuthProvider ({ children }) {
  const [
    authUser,
    setAuthUser
  ] = useState(null);

  const router = useRouter();
  const { pathname } = router;

  async function checkIsUserAuth () {
    if (typeof window === "undefined") {
      return;
    }

    const { jwt, spaccess, sprefresh } = parseCookies(null);

    if (!jwt) {
      if (!validPublicPaths.includes(pathname)) {

        router.push("/login");
      }
    } else {
      if (!spaccess && !sprefresh) {
        if (pathname !== authSpotify) {
          router.push("/dashboard/auth");
        }
      }

      const response = await fetcher(`${publicRuntimeConfig.API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      if (!response) {
        destroyCookie(null, "jwt", {
          path: "/"
        });
        setAuthUser(null);
      }

      setAuthUser(response.username);

    }
  }

  useEffect(() => {
    checkIsUserAuth();
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser,
      setAuthUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
