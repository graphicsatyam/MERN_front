// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Adjust path based on your project structure

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Get the authentication state from context

  return isAuthenticated ? element : <Navigate to="/admin" />;
};

export default PrivateRoute;
