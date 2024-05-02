import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getSeats = async (performanceId) => {
  return await axios.get(`${API_URL}/seats/${performanceId}`);
};

const reserveSeat = async (seatId, userId) => {
  return await axios.post(`${API_URL}/seats/reserve`, { seatId, userId });
};

export { getSeats, reserveSeat };
