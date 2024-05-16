import axios from 'axios';

const API_URL = 'http://localhost:5000/api/product-cart';

const getProductCart = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/cart/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching product cart:', error);
    throw error;
  }
};

const addToProductCart = async (userId, productId) => {
  try {
    const response = await axios.post(`${API_URL}/add-to-cart`, { userId, productId });
    return response;
  } catch (error) {
    console.error('Error adding to product cart:', error);
    throw error;
  }
};

const removeFromProductCart = async (userId, itemId) => {
  try {
    const response = await axios.post(`${API_URL}/remove-from-cart`, { userId, itemId });
    return response;
  } catch (error) {
    console.error('Error removing from product cart:', error);
    throw error;
  }
};

const purchaseProducts = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/purchase-products`, { userId });
    return response;
  } catch (error) {
    console.error('Error purchasing products:', error);
    throw error;
  }
};

const getProductCartCount = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/product-cart-count/${userId}`);
    return response.data.count;
  } catch (error) {
    console.error('Error fetching product cart count:', error);
    throw error;
  }
};

export { getProductCart, addToProductCart, removeFromProductCart, purchaseProducts, getProductCartCount };
