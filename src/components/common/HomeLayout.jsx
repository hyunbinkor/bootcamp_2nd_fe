import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default HomeLayout;
