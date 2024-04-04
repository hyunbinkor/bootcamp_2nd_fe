import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const [isAuth, setIsAuth] = useState(false);
  const getAuthStatus = () => {
    // auth api call
    const authResult = true;
    setIsAuth(authResult);
  };
  useEffect(() => {
    getAuthStatus();
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};
export default Layout;
