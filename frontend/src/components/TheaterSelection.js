import React, { useState, useEffect } from 'react';
import { getTheaters, createTheater } from '../services/apiTheaterService';
import { useNavigate } from 'react-router-dom';

const TheaterSelection = () => {
  const [theaters, setTheaters] = useState([]);
  const [newTheaterName, setNewTheaterName] = useState('');
  const [newTheaterAddress, setNewTheaterAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      const response = await getTheaters();
      setTheaters(response.data);
    } catch (error) {
      console.error('Failed to fetch theaters:', error);
    }
  };

  const handleSelectTheater = (theaterId) => {
    navigate(`/configure-seats/${theaterId}`);
  };

  const handleCreateTheater = async () => {
    try {
      const response = await createTheater({ name: newTheaterName, address: newTheaterAddress });
      const newTheater = response.data;
      navigate(`/configure-seats/${newTheater.id}`);
    } catch (error) {
      console.error('Failed to create theater:', error);
    }
  };

  return (
    <div>
      <h2>Select or Create Theater</h2>
      <h3>Existing Theaters</h3>
      <ul>
        {theaters.map(theater => (
          <li key={theater.id}>
            {theater.name} ({theater.address})
            <button onClick={() => handleSelectTheater(theater.id)}>Select</button>
          </li>
        ))}
      </ul>
      <h3>Create New Theater</h3>
      <input
        type="text"
        placeholder="Theater Name"
        value={newTheaterName}
        onChange={(e) => setNewTheaterName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Theater Address"
        value={newTheaterAddress}
        onChange={(e) => setNewTheaterAddress(e.target.value)}
      />
      <button onClick={handleCreateTheater}>Create</button>
    </div>
  );
};

export default TheaterSelection;
