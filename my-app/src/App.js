import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import ForgetPassword from './Pages/ForgetPassword';
import Register from './Pages/Register';
import Nav from './Components/Nav';
import Home from './Pages/Home';
import FileUpload from './Components/FileUpload';
import Course from './Pages/Course';
import Chat from './Pages/Chat';
import Profile from './Pages/Profile';
import Software from './Pages/CourseInfo';
import Feedback from './Pages/Feedback';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/forgetpassword" element={<ForgetPassword />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/fileupload" element={<FileUpload />} exact />
        <Route path="/course" element={<Course />} exact />
        <Route path="/feedback" element={<Feedback />} exact />
        <Route path="/chat" element={<Chat />} exact />
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/software" element={<Software />} exact />
      </Routes>
    </div>
  );
}

export default App;
