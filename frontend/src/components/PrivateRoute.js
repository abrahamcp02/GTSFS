import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../components/useAuth';

const PrivateRoute = ({ children }) => {
  useAuth();

  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute