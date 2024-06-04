import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de importar Link aquí
import { fetchNews } from '../services/apiNewsService';
import { jwtDecode } from "jwt-decode";
import './styles/NewsList.css';

var role = "user";
var user = "";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const userToken = localStorage.getItem('token');
  const navigate = useNavigate();


  useEffect(() => {
    const getAllNews = async () => {
      const response = await fetchNews();
      console.log(response.data);
      setNews(response.data);
    };
    getAllNews();
  }, []);

  const token = localStorage.getItem('token');

  if (token) {
    const decoded = jwtDecode(token);
    role=decoded.role;
  }

  if (role=="admin"){
    return (
      <div className="news-list-container">
      {role === "admin" && (
        <div className="create-news-button-container">
          <button
            className="btn btn-success"
            onClick={() => navigate('/create-news')}
          >
            Crear Noticia
          </button>
        </div>
      )}
        {news.map(news => (
          <div key={news.id} className="news-item">
            <div className="news-image-container">
              <img src={news.image} alt={news.title} className="news-image" />
            </div>
            <div className="news-details">
              <Link to={`/news/${news.id}`} className="news-name">
                {news.title}
              </Link>
              <div className="news-actions">
              <button
                  className="edit-button"
                  onClick={() => navigate(`/edit-news/${news.id}`)}
                >
                  ✏️
                </button>
                <button
                  className="delete-button"
                  onClick={() => navigate(`/delete-news/${news.id}`)}
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  else {
    return (
      <div className="news-list-container">
        {news.map(news => (
          <div key={news.id} className="news-item">
            <div className="news-image-container">
              <img src={news.image} alt={news.title} className="news-image" />
            </div>
            <div className="news-details">
              <Link to={`/news/${news.id}`} className="news-name">
                {news.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }

};

export default NewsList;
