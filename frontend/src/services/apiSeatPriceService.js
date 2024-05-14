import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getPricesByPerformanceId = async (performanceId) => {
  try {
    const response = await axios.get(`${API_URL}/performances/${performanceId}/seat-prices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching seat prices:', error);
    throw error;
  }
};

const createOrUpdateSeatPrice = async (seatId, performanceId, price) => {
  return await axios.post(`${API_URL}/seatPrices`, { seatId, performanceId, price });
};

export { getPricesByPerformanceId, createOrUpdateSeatPrice };
