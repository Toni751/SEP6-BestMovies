import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const RequireAuth = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
