import axios from 'axios';

const API_URL = 'http://localhost:5000/api/performances';

export const fetchPerformances = async () => {
  return await axios.get(API_URL);
};

export const fetchPerformanceById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const createPerformance = async (performance) => {
  return await axios.post(API_URL, performance);
};

export const updatePerformance = async (id, performance) => {
  return await axios.put(`${API_URL}/${id}`, performance);
};

export const deletePerformance = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
