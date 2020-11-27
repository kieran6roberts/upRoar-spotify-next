import "src/App.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "src/components/Loading/Loading";
import AuthProvider from "src/context/AuthContext";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [ isLoading, setIsloading ] = useState(false);
  
  useEffect(() => {
    const handleLoadStart = url => {
      console.log("app is changing to " + url);
      setIsloading(true)
    };
    const handleLoadEnd = () => {
      setIsloading(false);
    };

    router.events.on("routeChangeStart", handleLoadStart);
    router.events.on("routeChangeComplete", handleLoadEnd);
    router.events.on("routeChangeError", handleLoadEnd);

    return () => {
      router.events.off("routeChangeStart", handleLoadStart);
      router.events.off("routeChangeComplete", handleLoadStart);
      router.events.off("routeChangeError", handleLoadEnd);
    }
  }, []);

  return (
    <AuthProvider>
      {isLoading ? <Loading></Loading> : 
        <Component {...pageProps} />
      }
    </AuthProvider>
  )
}

export default MyApp
