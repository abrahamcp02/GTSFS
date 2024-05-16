import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap";
import { FaShoppingCart, FaTicketAlt } from "react-icons/fa";
import { getCartCount } from '../services/apiTicketService';
import { getProductCartCount } from '../services/apiProductCartService';
import './NavBar.css';

var role = "";
var username = ""

const NavBar = () => {
  const { user, setUser } = useUser();
  const [ticketCartCount, setTicketCartCount] = useState(0);
  const [productCartCount, setProductCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCounts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.id;

          const ticketCount = await getCartCount(userId);
          const productCount = await getProductCartCount(userId);

          setTicketCartCount(ticketCount);
          setProductCartCount(productCount);
        }
      } catch (error) {
        console.error('Error fetching cart counts:', error);
      }
    };

    fetchCartCounts();
    const intervalId = setInterval(fetchCartCounts, 10000); // Actualiza cada 10 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  const handleLogout = () => {
    setUser(null); // Limpia el usuario del contexto
    localStorage.removeItem('token'); // Elimina el token del localStorage
    window.location.href = '/';
  };

  const token = localStorage.getItem('token');

  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.username;
    role = decoded.role;
  }

  if (role=="admin"){
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
              <Link className="nav-link" to="/performances">Funciones Teatrales</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="theater-selection">Administrar Teatros</Link>
            </li>
          </ul>
          <li className="nav-item dropdown">
              <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Hola, {username}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li><Link className="dropdown-item" to="/my-tickets">Mis Entradas</Link></li>
                <li><Link className="dropdown-item" to="/my-orders">Mis Pedidos</Link></li>
                <li><Link className="dropdown-item" onClick={handleLogout}>Cerrar sesión</Link></li>
              </ul>
            </li>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link position-relative" to="cart">
                <FaTicketAlt /> Entradas
                {ticketCartCount > 0 && (
                  <span className="badge badge-pill bg-danger position-absolute top-0 start-100 translate-middle">
                    {ticketCartCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to="product-cart">
                <FaShoppingCart /> Productos
                {productCartCount > 0 && (
                  <span className="badge badge-pill bg-danger position-absolute top-0 start-100 translate-middle">
                    {productCartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else if(!token) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="https://i.ibb.co/SRP0Tsg/logoteatro-removebg-preview.png" alt="Logo" width="230" height="110" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              <Link className="nav-link" to="/">Inicio</Link>
              <Link className="nav-link" to="/store">Tienda</Link>
              <Link className="nav-link" to="/performances">Funciones Teatrales</Link>
              <Link className="nav-link" to="/login" button="login-button">Iniciar Sesión</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  } else{
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
              <Link className="nav-link" to="/performances">Funciones Teatrales</Link>
            </li>
          </ul>
          <li className="nav-item dropdown">
              <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Hola, {username}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li><Link className="dropdown-item" to="/my-tickets">Mis Entradas</Link></li>
                <li><Link className="dropdown-item" to="/my-orders">Mis Pedidos</Link></li>
                <li><Link className="dropdown-item" onClick={handleLogout}>Cerrar sesión</Link></li>
              </ul>
            </li>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link position-relative" to="cart">
                <FaTicketAlt /> Entradas
                {ticketCartCount > 0 && (
                  <span className="badge badge-pill bg-danger position-absolute top-0 start-100 translate-middle">
                    {ticketCartCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to="product-cart">
                <FaShoppingCart /> Productos
                {productCartCount > 0 && (
                  <span className="badge badge-pill bg-danger position-absolute top-0 start-100 translate-middle">
                    {productCartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );

  }

  
};

export default NavBar;
