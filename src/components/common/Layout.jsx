import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Load from '../../pages/Homepages/Loading';

const Layout = () => {
  const { isAuth, isLoading } = useAuth();
  return (
    <div className="bg-bgcolor w-screen flex justify-center">
      <div className="h-screen w-screen max-w-screen-sm">
        {isLoading ? <Load /> : <Outlet />}
      </div>
    </div>
  );
};
export default Layout;
