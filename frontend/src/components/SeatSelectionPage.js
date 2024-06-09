import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSeatsByPerformanceId } from '../services/apiSeatService';
import SeatMap from './SeatMap';

const SeatSelectionPage = () => {
    const { performanceId } = useParams();
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        getSeatsByPerformanceId(performanceId).then(setSeats).catch(console.error);
    }, [performanceId]);

    return (
        <div>
            <h1>Seleccione sus asientos</h1>
            <SeatMap seats={seats} performanceId={performanceId} />
        </div>
    );
};

export default SeatSelectionPage;

