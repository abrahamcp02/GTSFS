import axios from 'axios';

const API_URL = 'http://localhost:5000/api/news';

const fetchNews = async () => {
    return await axios.get(API_URL);
  };

const fetchNewsById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

const createNews = async (news) => {
  return await axios.post(API_URL, news);
};

const updateNews = async (id, news) => {
  return await axios.put(`${API_URL}/${id}`, news);
};

const deleteNews = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export {fetchNews, fetchNewsById, updateNews, deleteNews, createNews};
