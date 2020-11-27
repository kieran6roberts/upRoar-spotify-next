import "src/App.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import AuthProvider from "src/context/AuthContext";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = url => {
      console.log("app is changing to " + url);
    };
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    }
  }, []);

  return (
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
