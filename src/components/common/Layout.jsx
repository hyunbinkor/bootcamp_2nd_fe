import { Outlet } from "react-router-dom";
// 전체 스타일 여기서 적용

const Layout = () => {
  return (
    <div className="bg-bgcolor w-screen h-screen max-w-screen-sm w-full h-full">
      <Outlet />
    </div>
  );
};
export default Layout;
