import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

const getMyOrders = async (userId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return await axios.get(`${API_URL}/my-orders/${userId}`, config);
};

export { getMyOrders };
