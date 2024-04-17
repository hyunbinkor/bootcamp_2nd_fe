import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/common/Layout.jsx';
import { LoadingProvider } from './components/common/LoadingContext.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';
import Home from './pages/Homepages/Home.jsx';
import GuestTree from './pages/guestpages/Tree.jsx';
import Error from './pages/Homepages/Error.jsx';
import Load from './pages/Homepages/Loading.jsx';
const Kakao = React.lazy(() => import('./pages/Homepages/Kakao.jsx'));
const Naver = React.lazy(() => import('./pages/Homepages/Naver.jsx'));
const HostTree = React.lazy(() => import('./pages/hostpages/Tree.jsx'));
const Questions = React.lazy(() => import('./pages/hostpages/Questions.jsx'));
const SelectImage = React.lazy(
  () => import('./pages/guestpages/SelectImage.jsx')
);
const Message = React.lazy(() => import('./pages/guestpages/Message.jsx'));
const HostMessage = React.lazy(() => import('./pages/hostpages/Message.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/kakao', element: <Kakao /> },
      { path: '/naver', element: <Naver /> },
      { path: '/load', element: <Load /> },
      { path: '/host/tree/:id', element: <HostTree /> },
      { path: '/host/tree/:id/message', element: <HostMessage /> },
      { path: '/guest/tree/:id', element: <GuestTree /> },
      { path: '/guest/tree/:id/image', element: <SelectImage /> },
      { path: '/guest/tree/:id/image/message', element: <Message /> },
      { path: '/host/question', element: <Questions /> }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ErrorBoundary FallbackComponent={Error}>
    <LoadingProvider>
      <RouterProvider router={router} />
    </LoadingProvider>
  </ErrorBoundary>
  // </React.StrictMode>
);
