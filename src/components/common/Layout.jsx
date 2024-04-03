import React from 'react';

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
