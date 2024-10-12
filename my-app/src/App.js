import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import ForgetPassword from './Pages/ForgetPassword';
import Register from './Pages/Register';
import Nav from './Components/Nav';
import Home from './Pages/Home';


function App() {
  return (
    <div className="App">
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/forgetpassword" element={<ForgetPassword />} exact />
        <Route path="/register" element={<Register />} exact />
      </Routes>
    </div>
  );
}

export default App;
