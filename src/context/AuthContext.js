import getConfig from "next/config";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import React, { createContext, useContext, useEffect, useState } from "react";

import { validPublicPaths } from "@/containers/AuthRoutes/routes";
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

    const { jwt } = parseCookies(null);

    if (!jwt) {
      console.log("empty jwt");
      if (!validPublicPaths.includes(pathname)) {
        console.log("not a valid public path");

        router.push("/login");
      }
    } else {
      console.log("fetching user");
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
