import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Load from '../../pages/Homepages/Loading';

const LayoutContent = () => {
  return (
    <div className="bg-bgcolor w-screen flex justify-center">
      <div className="h-screen w-screen max-w-screen-sm">
        <Outlet />
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <Suspense fallback={<Load />}>
      <LayoutContent />
    </Suspense>
  );
};

export default Layout;
