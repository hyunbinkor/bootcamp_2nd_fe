import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeLayout from './components/common/HomeLayout.jsx';
// import HostLayout from "./components/common/HostLayout.jsx";
// import GuestLayout from "./components/common/GuestLayout.jsx";
import Layout from './components/common/Layout.jsx';
import './index.css';
import Home from './components/pages/Homepages/Home.jsx';
import Login from './components/pages/Homepages/Login.jsx';
import Questions from './components/pages/hostpages/Questions.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <Layout />,
    children: [
      {
        path: '/home',
        element: <HomeLayout />,
        children: [
          { path: '/home', element: <Home /> },
          { path: '/home/login', element: <Login /> },
          { path: '/host/question', element: <Questions /> }
        ]
      }
      /*,
      { path: "/host", element: <HostLayout />, children: [] },
      { path: "/guest", element: <GuestLayout />, children: [] },
      */
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
