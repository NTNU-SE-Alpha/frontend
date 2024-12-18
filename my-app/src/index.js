import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './Styles/style.scss';

import './Styles/github-markdown-css-light.css';

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
import CourseInfo from './Pages/CourseInfo';
import ErrorPage from './Pages/NotFoundPage';
import Setting from './Pages/Setting';
import Media from './Components/MediaRecord';
import Something from './Pages/Something';
import LogOut from './Components/LogOut';
import CourseEdit from './Pages/CourseEdit';

const root = document.querySelector('#root');

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <Nav />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/course',
        element: (
          <RequireAuth>
            <Course />
          </RequireAuth>
        ),
      },
      {
        path: '/course/:courseId',
        element: (
          <RequireAuth>
            <CourseInfo />
          </RequireAuth>
        ),
      },
      {
        path: '/course/edit',
        element: <CourseInfo />,
      },
      {
        path: '/chat',
        element: (
          <RequireAuth>
            <Chat />
          </RequireAuth>
        ),
      },
      {
        path: '/chat/:uuid',
        element: (
          <RequireAuth>
            <Chat />
          </RequireAuth>
        ),
      },
      {
        path: '/edit/',
        element: (
          <RequireAuth>
            <CourseEdit />
          </RequireAuth>
        ),
      },
      {
        path: '/setting',
        element: (
          <RequireAuth>
            <Setting />
          </RequireAuth>
        ),
      },
      {
        path: '/profile',
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <LogOut />,
  },
  {
    path: '/chat-student',
    element: (
      <RequireAuth>
        <Chat />
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

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
