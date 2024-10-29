import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './Styles/style.css';
// import App from './App';
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
import ErrorPage from "./Pages/NotFoundPage";

const root = document.querySelector("#root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/course",
        element: <Course />,
      },
      {
        path: "/course/:courseId",
        element: <Software />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgetpassword",
        element: <ForgetPassword />,
      },
    ]
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/softwares",
    element: <Software />,
  },
  {
    path: "/fileupload",
    element: <FileUpload />,
  }
]);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);