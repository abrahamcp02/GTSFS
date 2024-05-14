import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getTheaters = async () => {
  try {
    const response = await axios.get(`${API_URL}/theaters`);
    return response;
  } catch (error) {
    console.error('Error fetching theaters:', error);
    throw error;
  }
};

const createTheater = async (theater) => {
  try {
    const response = await axios.post(`${API_URL}/theaters`, theater);
    return response;
  } catch (error) {
    console.error('Error creating theater:', error);
    throw error;
  }
};

export { getTheaters, createTheater };
