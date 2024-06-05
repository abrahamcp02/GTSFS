import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../components/useAuth'; // Asegúrate de importar correctamente

const PrivateRoute = ({ children }) => {
  useAuth(); // Llama al hook para realizar la autenticación

  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute