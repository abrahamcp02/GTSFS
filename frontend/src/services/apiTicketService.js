import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tickets';

const addToCart = async (userId, seatId, performanceId) => {
  return await axios.post(`${API_URL}/add-to-cart`, { userId, seatId, performanceId });
};

const getCart = async (userId) => {
  return await axios.get(`${API_URL}/cart/${userId}`);
};

const purchaseTickets = async (userId) => {
  return await axios.post(`${API_URL}/purchase`, { userId });
};

export { addToCart, getCart, purchaseTickets };
