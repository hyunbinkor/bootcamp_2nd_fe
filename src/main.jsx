import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/common/Layout.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';
import Home from './pages/Homepages/Home.jsx';
import Error from './pages/Homepages/Error.jsx';
import Load from './pages/Homepages/Loading.jsx';
const Kakao = React.lazy(() => import('./pages/Homepages/Kakao.jsx'));
const Naver = React.lazy(() => import('./pages/Homepages/Naver.jsx'));
const HostIsland = React.lazy(() => import('./pages/hostpages/Island.jsx'));
const Questions = React.lazy(() => import('./pages/hostpages/Questions.jsx'));
const SelectImage = React.lazy(
  () => import('./pages/guestpages/SelectImage.jsx')
);
const Message = React.lazy(() => import('./pages/guestpages/Message.jsx'));
const HostMessage = React.lazy(() => import('./pages/hostpages/Message.jsx'));
const GuestIsland = React.lazy(() => import('./pages/guestpages/Island.jsx'));
const Temp = React.lazy(() => import('./pages/guestpages/Temp.jsx'));

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
      { path: '/guest/tree/:id', element: <GuestIsland /> },
      { path: '/guest/tree/:id/image', element: <SelectImage /> },
      { path: '/guest/tree/:id/image/message', element: <Message /> },
      { path: '/guest/tree/:id/image/message/temp', element: <Temp /> },
      { path: '/host/question', element: <Questions /> }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ErrorBoundary FallbackComponent={Error}>
    <RouterProvider router={router} />
  </ErrorBoundary>
  // </React.StrictMode>
);
