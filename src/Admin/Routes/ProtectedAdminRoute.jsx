import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null); // null for loading state

  useEffect(() => {
    const role = localStorage.getItem("role");
    // Check if role is admin
    setIsAdmin(role === "admin");
  }, []);

  if (isAdmin === null) {
    return <div>Loading...</div>; // Show a loading indicator while checking
  }

  return isAdmin ? children : <Navigate to="/login" replace />; // Redirect if not an admin
};

export default ProtectedAdminRoute;
