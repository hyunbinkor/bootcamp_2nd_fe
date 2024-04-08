import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { apiLoginKakao } from '../../utils/api';
import { ROUTE_PATHS } from '../../utils/consts';

const useAuth = async () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const getAuthStatus = async () => {
    setIsLoading(true);
    const authResult = await apiLoginKakao();
    setIsLoading(false);
    setIsAuth(authResult);
  };

  useEffect(() => {
    if (ROUTE_PATHS.PRIVATE.includes(location.pathname)) {
      getAuthStatus();
    }
  }, [location.pathname]);
  return {
    isAuth,
    isLoading
  };
};

export default useAuth;
