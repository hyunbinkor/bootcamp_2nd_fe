import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingProvider from './LoadingContext';
import Load from '../../pages/Homepages/Loading';

const LayoutContent = () => {
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

const Layout = () => {
  return (
    <Suspense fallback={<Load />}>
      <LayoutContent />
    </Suspense>
  );
};

export default Layout;
