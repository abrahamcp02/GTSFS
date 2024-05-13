import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSeatsByPerformanceId } from '../services/apiSeatService'; // Importa la función adecuada
import SeatMap from './SeatMap';

const SeatSelectionPage = () => {
    const { performanceId } = useParams();
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        getSeatsByPerformanceId(performanceId).then(setSeats).catch(console.error);
    }, [performanceId]);

    const handleSeatSelect = (seatId) => {
        console.log(`Seat ${seatId} selected`);
        // Aquí podrías añadir lógica para reservar el asiento
    };

    return (
        <div>
            <h1>Seleccione sus asientos</h1>
            <SeatMap seats={seats} onSeatSelect={handleSeatSelect} />
        </div>
    );
};

export default SeatSelectionPage;

