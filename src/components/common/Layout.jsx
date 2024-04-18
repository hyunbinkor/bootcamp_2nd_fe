import { Outlet } from 'react-router-dom';
import Load from '../../pages/Homepages/Loading';

const Layout = () => {
  return (
    <div className="bg-bgcolor w-screen flex justify-center">
      <div className="h-screen w-screen max-w-screen-sm">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
