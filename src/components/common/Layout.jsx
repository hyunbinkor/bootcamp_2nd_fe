import { Outlet } from 'react-router-dom';
import LoadingProvider from './LoadingContext';

const Layout = () => {
  return (
    <div className="bg-bgcolor w-screen flex justify-center z-10">
      <div className="h-screen w-screen max-w-screen-sm">
        <LoadingProvider>
          <Outlet />
        </LoadingProvider>
      </div>
    </div>
  );
};
export default Layout;
