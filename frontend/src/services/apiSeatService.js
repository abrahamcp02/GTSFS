import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getSeatsByPerformanceId = async (performanceId) => {
  try {
    const response = await axios.get(`${API_URL}/seats/${performanceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching seats:', error);
    throw error;
  }
};

const getRowsByTheaterId = async (theaterId) => {
  try {
    const response = await axios.get(`${API_URL}/rows/theater/${theaterId}`);
    return response;
  } catch (error) {
    console.error('Error fetching rows:', error);
    throw error;
  }
};

const fetchAvailableSeats = async (performanceId) => {
  try {
    const response = await axios.get(`${API_URL}/performances/${performanceId}/available-seats`);
    return response.data.availableSeats;
  } catch (error) {
    console.error("Error fetching available seats:", error);
    throw error;
  }
}

const reserveSeat = async (seatId, userId) => {
    return await axios.post(`${API_URL}/seats/reserve`, {
        seatId,
        userId
    });
  };

const createRow = async (theaterId, row) => {
  return axios.post(`${API_URL}/theaters/${theaterId}/rows`, row, theaterId);
};  
  
const createSeat = async (rowId, seat) => {
  return axios.post(`${API_URL}/rows/${rowId}/seats`, seat);
};
  
const deleteRow = async (rowId) => {
    return await axios.delete(`${API_URL}/rows/${rowId}`);
  };
  
const deleteSeat = async (seatId) => {
    return await axios.delete(`${API_URL}/seats/${seatId}`);
  };

export { getSeatsByPerformanceId, reserveSeat, createRow, createSeat, deleteRow, deleteSeat, getRowsByTheaterId, fetchAvailableSeats };