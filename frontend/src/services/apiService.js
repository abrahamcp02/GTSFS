import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

const fetchProducts = async () => {
  return await axios.get(API_URL);
};

const fetchProductById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
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

export {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};