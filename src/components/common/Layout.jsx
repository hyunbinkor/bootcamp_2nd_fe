import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
// 전체 스타일 여기서 적용

const Layout = ({ children }) => {
  return (
    <div className="bg-black">
      <div className="bg-white min-h-screen max-w-500px mx-auto tracking-tight">
        {children}
      </div>
    </div>
  );
};

export default Layout;
