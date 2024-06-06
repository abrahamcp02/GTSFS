import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNewsById } from '../services/apiNewsService';
import './styles/NewsDetails.css';

const NewsDetails = () => {
  const { newsId } = useParams();
  const [news, setNews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetchNewsById(newsId);
        setNews(response.data);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsDetails();
  }, [newsId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!news) {
    return <div>News not found</div>;
  }

  return (
    <div className="news-details-container">
      <div className="news-image-container">
        <img src={news[0].image} alt={news[0].title} className="news-image" />
      </div>
      <div className="news-info">
        <h1 className="news-title">{news[0].title}</h1>
        <div
          className="news-description"
          dangerouslySetInnerHTML={{ __html: news[0].content }}
        ></div>
      </div>
    </div>
  );
};

export default NewsDetails;
