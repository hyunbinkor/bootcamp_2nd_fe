import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HostLayout from "./components/common/HostLayout.jsx";
import GuestLayout from "./components/common/GuestLayout.jsx";
import Layout from "./components/common/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/host", element: <HostLayout /> },
      { path: "/guest", element: <GuestLayout /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
