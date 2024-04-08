import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/common/Layout.jsx';
import './index.css';
import Home from './pages/Homepages/Home.jsx';
import GuestTree from './pages/guestpages/Tree.jsx';
const Kakao = React.lazy(() => import('./pages/Homepages/Kakao.jsx'));
const Naver = React.lazy(() => import('./pages/Homepages/Naver.jsx'));
const HostTree = React.lazy(() => import('./pages/hostpages/Tree.jsx'));
const Questions = React.lazy(() => import('./pages/hostpages/Questions.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/kakao', element: <Kakao /> },
      { path: '/naver', element: <Naver /> },
      { path: '/host/question', element: <Questions /> },
      { path: '/host/tree/:id', element: <HostTree /> },
      { path: '/guest/tree/:id', element: <GuestTree /> }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
