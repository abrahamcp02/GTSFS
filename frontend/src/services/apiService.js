import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

const fetchProducts = async () => {
  return await axios.get(API_URL);
};

const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw error;
  }
};

const createProduct = async (product) => {
  return await axios.post(API_URL, product);
};

const updateProduct = async (id, product) => {
  return await axios.put(`${API_URL}/${id}`, product);
};

const deleteProduct = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

const addToProductCart = async (userId, productId) => {
  try {
    const response = await axios.post(`${API_URL}/product-cart`, { userId, productId });
    return response;
  } catch (error) {
    console.error('Error adding to product cart:', error);
    throw error;
  }
};

export {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addToProductCart
};