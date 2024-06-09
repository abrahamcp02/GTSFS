import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthWrapper = ({ children, adminOnly }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          navigate('/login');
        } else {
          setIsAuthenticated(true);
          setIsAdmin(decodedToken.role === 'admin');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
      }
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated && adminOnly && !isAdmin) {
      alert('No tienes permiso para acceder a esta página.');
      navigate('/');
    }
  }, [isAuthenticated, adminOnly, isAdmin, navigate]);

  if (!isAuthenticated || (adminOnly && !isAdmin)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
