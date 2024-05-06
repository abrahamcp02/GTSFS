import axios from 'axios';

const API_URL = 'http://localhost:5000/api/news';

const fetchNews = async () => {
    return await axios.get(API_URL);
  };

  const fetchNewsById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
  };

export {fetchNews, fetchNewsById};