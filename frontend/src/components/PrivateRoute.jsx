import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // For now, we'll use a placeholder for authentication status.
  // Later, we'll replace this with actual token check (e.g., localStorage.getItem('token'))
  const isAuthenticated = localStorage.getItem('token'); // Check if a token exists

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;