import React, { useState, useEffect } from 'react';
import NewsList from './NewsList';
import { jwtDecode } from "jwt-decode";
import { fetchNews } from '../services/apiNewsService';


const HomePage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getAllNews = async () => {
      const response = await fetchNews();
      setNews(response.data);
    };
    getAllNews();
  }, []);

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
      <NewsList news={news} />
      </div>
      
    );
  }
  else{
    return (
      <div>
      <NewsList news={news} />
      </div>
      
    );
  };
}



export default HomePage;
