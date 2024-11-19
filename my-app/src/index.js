import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './Styles/style.scss';
// import './Styles/style.css';
// import App from './App';
import RequireAuth from './Components/RequireAuth';
import Login from './Pages/Login';
import ForgetPassword from './Pages/ForgetPassword';
import Register from './Pages/Register';
import Nav from './Components/Nav';
import Home from './Pages/Home';
import FileUpload from './Pages/FileUpload';
import Course from './Pages/Course';
import Chat from './Pages/Chat';
import Profile from './Pages/Profile';
import Software from './Pages/Software';
import ErrorPage from './Pages/NotFoundPage';
import Setting from './Pages/Setting';
import Media from './Pages/MediaRecord';

const root = document.querySelector('#root');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/course',
        element: <Course />,
      },
      {
        path: '/course/:courseId',
        element: <Software />,
      },

      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/forgetpassword',
        element: <ForgetPassword />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/setting',
        element: <Setting />,
      },
    ],
  },
  {
    path: '/profile',
    element: <Profile />,
  },

  {
    path: '/softwares',
    element: <Software />,
  },
  {
    path: '/chat2',
    element: (
      <RequireAuth>
        <Chat />
      </RequireAuth>
    ),
  },
  {
    path: '/softwares',
    element: (
      <RequireAuth>
        <Software />
      </RequireAuth>
    ),
  },
  {
    path: '/fileupload',
    element: <FileUpload />,
  },
  {
    path: '/media',
    element: <Media />,
  },
]);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
