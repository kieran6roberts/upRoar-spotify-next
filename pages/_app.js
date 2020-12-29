import "../src/App.css";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Loading from "@/components/Loading/Loading";
import AuthProvider from "@/context/AuthContext";
import ThemeProvider from "@/context/ThemeContext";

function MyApp ({ Component, pageProps }) {
  const router = useRouter();
  const [
    isLoading,
    setIsloading
  ] = useState(false);

  useEffect(() => {
    function handleLoadStart () {
      setIsloading(true);
    }
    function handleLoadEnd () {
      setIsloading(false);
    }

    router.events.on("routeChangeStart", handleLoadStart);
    router.events.on("routeChangeComplete", handleLoadEnd);
    router.events.on("routeChangeError", handleLoadEnd);

    return () => {
      router.events.off("routeChangeStart", handleLoadStart);
      router.events.off("routeChangeComplete", handleLoadEnd);
      router.events.off("routeChangeError", handleLoadEnd);
    };
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
      {isLoading
        ? <Loading />
        : <Component {...pageProps} />}
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
