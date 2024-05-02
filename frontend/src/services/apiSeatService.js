import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getSeats = async (performanceId) => {
    try {
      const response = await axios.get(`${API_URL}/seats/${performanceId}`);
      return response.data;  // Asegúrate de que el backend devuelva los datos en el formato correcto.
    } catch (error) {
      console.error('Error fetching seats:', error);
      throw error;
    }
  };

const reserveSeat = async (seatId, userId) => {
    return await axios.post(`${API_URL}/seats/reserve`, {
        seatId,
        userId
    });
};

export { getSeats, reserveSeat };