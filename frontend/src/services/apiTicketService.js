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

const removeFromCart = async (userId, itemId) => {
  try {
    const response = await axios.post(`${API_URL}/remove-from-cart`, { userId, itemId });
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

const getMyTickets = async (userId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const response = await axios.get(`${API_URL}/my-tickets/${userId}`, config);
    return response;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

const getCartCount = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/cart-count/${userId}`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching cart count:', error);
    throw error;
  }
};

export { addToCart, getCart, purchaseTickets, removeFromCart, getMyTickets, getCartCount };
