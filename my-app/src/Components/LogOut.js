import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('是否確定登出？');

    if (confirmLogout) {
      localStorage.removeItem('token');
      navigate('/login');
    } else {
      navigate(-1);
    }
  };
  useEffect(() => {
    handleLogout();
  }, []);
  return <div></div>;
};

export default Logout;
