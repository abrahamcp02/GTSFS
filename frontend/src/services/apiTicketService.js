import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tickets';

const addToCart = async (userId, seatId, performanceId) => {
  try {
    const response = await axios.post(`${API_URL}/add-to-cart`, { userId, seatId, performanceId });
    return response;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

const removeFromCart = async (userId, seatId) => {
  try {
    const response = await axios.post(`${API_URL}/remove-from-cart`, { userId, seatId });
    return response;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

const getCart = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/cart/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

const purchaseTickets = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/purchase`, { userId });
    return response;
  } catch (error) {
    console.error('Error purchasing tickets:', error);
    throw error;
  }
};

export { addToCart, getCart, purchaseTickets, removeFromCart };
