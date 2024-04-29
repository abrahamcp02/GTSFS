import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import HeroSection from './HeroSection';
import { jwtDecode } from "jwt-decode";


const HomePage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Aquí podrías hacer una solicitud a tu backend para obtener las noticias
    fetch('/api/news')
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');  // Elimina el token de localStorage
    // Aquí también puedes redirigir al usuario a la pantalla de inicio de sesión o a la página principal
    window.location.href = '/login'; // Redirecciona al usuario a la página de login
  };

  var username = "vacio";
  var role = "vacio";
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
      username=decoded.username;
      role=decoded.role;
  }

  if(username==="vacio"){
    return (
      <div>
      <HeroSection />
        {news.map(item => (
          <NewsItem key={item.id} title={item.title} content={item.content} />
        ))}
      <button onClick={logout} style={{ cursor: 'pointer' }}>
        Cerrar Sesión
      </button>
      </div>
      
    );
  }
  else{
    return (
      <div>
      <h1>Bienvenido {username}, eres {role}</h1>
      <HeroSection />
        {news.map(item => (
          <NewsItem key={item.id} title={item.title} content={item.content} />
        ))}
      <button onClick={logout} style={{ cursor: 'pointer' }}>
        Cerrar Sesión
      </button>
      </div>
      
    );
  };
}



export default HomePage;
