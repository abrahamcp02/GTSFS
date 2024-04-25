import axios from 'axios';

const API_URL = 'http://localhost:5000/api/performances';

const fetchPerformances = async () => {
    return await axios.get(API_URL);
  };
  const fetchPerformanceById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
  };
  const createPerformance = async (performance) => {
    return await axios.post(API_URL, performance);
  };
  const updatePerformance = async (id, performance) => {
    return await axios.put(`${API_URL}/${id}`, performance);
  };
  const deletePerformance = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
  };

  export {  
    fetchPerformances,
    fetchPerformanceById,
    createPerformance,
    updatePerformance,
    deletePerformance,
  }