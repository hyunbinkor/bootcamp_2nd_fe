import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/common/Layout.jsx";
import "./index.css";
import Home from "./pages/Homepages/Home.jsx";
import Kakao from "./pages/Homepages/Kakao.jsx";
import Naver from "./pages/Homepages/Naver.jsx";
import HostTree from "./pages/hostpages/Tree.jsx";
import GuestTree from "./pages/guestpages/Tree.jsx";
import SelectImage from "./pages/guestpages/SelectImage.jsx";
import Message from "./pages/guestpages/Message.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/kakao", element: <Kakao /> },
      { path: "/naver", element: <Naver /> },
      { path: "/host/tree/:id", element: <HostTree /> },
      { path: "/guest/tree/:id", element: <GuestTree /> },
      { path: "/guest/tree/:id/image", element: <SelectImage /> },
      { path: "/guest/tree/:id/image/message", element: <Message /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
