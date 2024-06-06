import React from 'react';
import * as Icon from 'react-bootstrap-icons'; // Importa los iconos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Footer.css'; // Asegúrate de tener los estilos para el footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>Grupo de Teatro San Francisco Solano © 2024</p>
      <div className="social-icons">
        <a href="https://www.instagram.com/grpsanfcosolano/" target="_blank" rel="noopener noreferrer">
          <Icon.Instagram />
        </a>
        <a href="https://www.facebook.com/GRPSANFCOSOLANO/?locale=es_ES" target="_blank" rel="noopener noreferrer">
          <Icon.Facebook />
        </a>
        <a href="https://www.youtube.com/@grupodeteatrosanfranciscos7342" target="_blank" rel="noopener noreferrer">
          <Icon.Youtube />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
