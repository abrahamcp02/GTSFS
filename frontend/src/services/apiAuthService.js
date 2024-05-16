import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const login = async (username, password) => {
  return await axios.post(`${API_URL}/login`, { username, password });
};

const register = async (username, email, name, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      name,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

  export {  
    login,
    register,
  }