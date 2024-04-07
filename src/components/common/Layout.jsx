import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
// 전체 스타일 여기서 적용

const Layout = () => {
  const { isAuth, isLoading } = useAuth();
  return (
    <div className="bg-bgcolor w-screen flex justify-center">
      <div className="h-screen w-screen max-w-screen-sm">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
