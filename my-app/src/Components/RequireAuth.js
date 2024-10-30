import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  const token = localStorage.getItem("jwtToken");
  const location = useLocation();

  if (!token) {
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;