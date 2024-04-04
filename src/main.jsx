import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HostLayout from './components/common/HostLayout.jsx';
import GuestLayout from './components/common/GuestLayout.jsx';
import Layout from './components/common/Layout.jsx';
import HostTree from './components/pages/hostpages/Tree.jsx';
import GuestTree from './components/pages/guestpages/Tree.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'host',
        element: <HostLayout />,
        children: [{ path: 'tree/:temp', element: <HostTree /> }]
      },
      {
        path: 'guest',
        element: <GuestLayout />,
        children: [{ path: 'tree/:temp', element: <GuestTree /> },]
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
