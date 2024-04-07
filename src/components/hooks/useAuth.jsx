import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const publicPaths = ["/", "/home", "/naver", "/kakao"];
const privatePaths = [];

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const getAuthStatus = () => {
    setIsLoading(true);
    // auth api call [async/await]
    const authResult = true;
    setIsLoading(false);
    setIsAuth(authResult);
  };

  useEffect(() => {
    if (privatePaths.includes(location.pathname)) {
      getAuthStatus();
    }
  }, [location.pathname]);
  return {
    isAuth,
    isLoading,
  };
};

export default useAuth;
