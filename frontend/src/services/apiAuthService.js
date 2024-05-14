import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const login = async (username, password) => {
  return await axios.post(`${API_URL}/login`, { username, password });
};

const register = async (username, email, name, password) => {
  return await axios.post(`${API_URL}/register`, { username, email, name, password });
};

  export {  
    login,
    register,
  }