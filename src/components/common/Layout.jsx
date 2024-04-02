import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
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
      <Header />
      {isAuth && <div>인증 완료 </div>}
      {!isAuth && <div>(!)인증 오류</div>}
      <Outlet />
      <Footer />
    </>
  );
};
export default Layout;
