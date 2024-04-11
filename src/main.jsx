import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/common/Layout.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';
import Home from './pages/Homepages/Home.jsx';
import GuestTree from './pages/guestpages/Tree.jsx';
import Error from './pages/Homepages/Error.jsx';
const Kakao = React.lazy(() => import('./pages/Homepages/Kakao.jsx'));
const Naver = React.lazy(() => import('./pages/Homepages/Naver.jsx'));
const HostIsland = React.lazy(() => import('./pages/hostpages/Island.jsx'));
const Questions = React.lazy(() => import('./pages/hostpages/Questions.jsx'));
import SelectImage from './pages/guestpages/SelectImage.jsx';
import Message from './pages/guestpages/Message.jsx';
import HostMessage from './pages/hostpages/Message.jsx';
import Load from './pages/Homepages/Loading.jsx';
import GuestIsland from './pages/guestpages/Island.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/kakao', element: <Kakao /> },
      { path: '/naver', element: <Naver /> },
      { path: '/load', element: <Load /> },
      { path: '/host/tree/:id', element: <HostIsland /> },
      { path: '/host/tree/:id/message', element: <HostMessage /> },
      { path: '/guest/tree/:id', element: <GuestIsland />},
      { path: '/guest/tree/:id/image', element: <SelectImage /> },
      { path: '/guest/tree/:id/image/message', element: <Message /> },
      { path: '/host/question', element: <Questions /> }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={<Error />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
