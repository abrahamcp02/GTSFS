import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './NavBar.css';

const NavBar = () => {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null); // Limpia el usuario del contexto
    localStorage.removeItem('token'); // Elimina el token del localStorage
  };
  return (
    <nav style={{ backgroundColor: '#f8f9fa', padding: '10px 20px' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-between' }}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/store">Tienda</Link></li>
        <li><Link to="/information">Información</Link></li>
        <li><Link to="/performances">Funciones Teatrales</Link></li>
        <li><Link to="/login" className="login-button">Log In</Link></li>
        {user ? (
        <div>
          <button>{`Hola, ${user.name}`}</button>
          <div>
            <Link to="/user-details">Detalles del Usuario</Link>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      ) : (
        <Link to="/login">Iniciar Sesión</Link>
      )}
      </ul>
    </nav>
  );
};

export default NavBar;
