import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
// 전체 스타일 여기서 적용

const Layout = () => {
  return (
    <div className="bg-bgcolor w-screen h-screen max-w-screen-sm">
      <Outlet />
    </div>
  );
};
export default Layout;
