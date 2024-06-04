import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNewsById, updateNews } from '../services/apiNewsService';
import jwtDecode from 'jwt-decode';
import './styles/EditNews.css';

const EditNews = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState({ title: '', content: '', image: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetchNewsById(newsId);
        if (response.data && response.data.length > 0) {
          setNews(response.data[0]);
        } else if (response.data) {
          setNews(response.data);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    if (newsId) {
      fetchNews();
    }
  }, [newsId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateNews(newsId, news);
      navigate('/');
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="container edit-news-container">
      <h2 className="my-4">Editar Noticia</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={news.title}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Contenido:</label>
        <textarea
          id="content"
          name="content"
          value={news.content}
          onChange={handleChange}
          className="form-control"
          rows="5"
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Imagen (URL):</label>
        <input
          type="text"
          id="image"
          name="image"
          value={news.image}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button onClick={handleSave} className="btn btn-primary">
        Guardar
      </button>
    </div>
  );
};

export default EditNews;
