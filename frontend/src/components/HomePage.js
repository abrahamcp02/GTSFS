import React, { useState, useEffect } from 'react';
import NewsList from './NewsList';
import { jwtDecode } from 'jwt-decode';
import { fetchNews } from '../services/apiNewsService';
import UpcomingEvents from './UpcomingEvents';
import './styles/HomePage.css';

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [username, setUsername] = useState('vacio');
  const [role, setRole] = useState('vacio');

  useEffect(() => {
    const getAllNews = async () => {
      const response = await fetchNews();
      setNews(response.data);
    };
    getAllNews();

    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
      setRole(decoded.role);
    }
  }, []);

  return (
    <div>
      <div className="events-section">
        <h2>Próximos Eventos</h2>
        <UpcomingEvents />
      </div>

      <div className="news-section">
        <h2>Noticias Recientes</h2>
        <NewsList news={news} />
      </div>
    </div>
  );
};

export default HomePage;
