import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap";
import { FaShoppingCart, FaTicketAlt } from "react-icons/fa";


const NavBar = () => {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null); // Limpia el usuario del contexto
    localStorage.removeItem('token'); // Elimina el token del localStorage
    window.location.href = '/';
  };

  const token = localStorage.getItem('token');

  if (token) {
    const decoded = jwtDecode(token);
    const username=decoded.username;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <img src="https://i.ibb.co/SRP0Tsg/logoteatro-removebg-preview.png" alt="Logo" width="230" height="110" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/store">Tienda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/information">Información</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/performances">Funciones Teatrales</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="theater-selection">Administrar Teatros</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
          <li className="nav-item">
              <Link className="nav-link" to="cart"><FaTicketAlt />  Carrito Entradas</Link>
            </li>
            <li className='nav-item'>
              <Link className="nav-link" to="product-cart"><FaShoppingCart />  Carrito Productos</Link>
            </li>
            <li className="nav-item dropdown">
              <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Hola, {username}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li><Link className="dropdown-item" to="/profile">Mi perfil</Link></li>
                <li><Link className="dropdown-item" to="/my-tickets">Mis Entradas</Link></li>
                <li><Link className="dropdown-item" to="/my-orders">Mis Pedidos</Link></li>
                <li><Link className="dropdown-item" onClick={handleLogout}>Cerrar sesión</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  else{
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            <img src="https://i.ibb.co/SRP0Tsg/logoteatro-removebg-preview.png" alt="Logo" width="230" height="110" />
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto">
              <Link class="nav-link" to="/">Inicio</Link>
              <Link class="nav-link" to="/store">Tienda</Link>
              <Link class="nav-link" to="/information">Información</Link>
              <Link class="nav-link" to="/performances">Funciones Teatrales</Link>
              <Link class="nav-link" to="/login" button="login-button">Iniciar Sesión</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

};

export default NavBar;
