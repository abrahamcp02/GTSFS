import React, { useState, useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { getPricesByPerformanceId } from '../services/apiSeatPriceService';
import { addToCart } from '../services/apiTicketService';
import { jwtDecode } from "jwt-decode";
import './SeatMap.css';

const SeatMap = ({ seats, onSeatSelect, performanceId, userId }) => {
  const [seatPrices, setSeatPrices] = useState([]);

  useEffect(() => {
    if (!performanceId) {
      console.error('performanceId is undefined');
      return;
    }

    const fetchSeatPrices = async () => {
      try {
        const prices = await getPricesByPerformanceId(performanceId);
        console.log('Fetched seat prices:', prices);
        setSeatPrices(prices);
      } catch (error) {
        console.error('Error fetching seat prices:', error);
      }
    };

    fetchSeatPrices();
  }, [performanceId]);

  const handleSeatSelect = async (seatId) => {
    try {
      const token = localStorage.getItem('token');      
      if (token) {
        const decoded = jwtDecode(token);
        const userId=decoded.id;
      await addToCart(userId, seatId, performanceId);
      onSeatSelect(seatId);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const getSeatPrice = (seatId) => {
    const seatPrice = seatPrices.find(price => price.seat_id === seatId);
    return seatPrice ? seatPrice.price : 0;
  };

  if (!seats || !seats.length) {
    return <p>No seats available.</p>;
  }

  const rows = seats.reduce((acc, seat) => {
    const { row_number } = seat;
    acc[row_number] = acc[row_number] || [];
    acc[row_number].push(seat);
    return acc;
  }, {});

  const sortedRows = Object.keys(rows).sort((a, b) => parseInt(a) - parseInt(b));
  sortedRows.forEach(row_number => {
    rows[row_number].sort((a, b) => parseInt(a.seat_number) - parseInt(b.seat_number));
  });

  const renderTooltip = (seat) => (
    <Tooltip id={`tooltip-${seat.id}`}>
      {seat.is_reserved ? 'Ocupado' : `Asiento ${seat.seat_number} - ${getSeatPrice(seat.id)}€`}
    </Tooltip>
  );

  return (
    <div className="seat-map container">
      <div className="table-responsive">
        <table className="table table-bordered">
          <tbody>
            {sortedRows.map(row_number => (
              <tr key={row_number}>
                <td className="row-label">Fila {row_number}</td>
                {rows[row_number].map(seat => (
                  <OverlayTrigger
                    key={seat.id}
                    placement="top"
                    overlay={renderTooltip(seat)}
                  >
                    <td>
                      <button
                        className={`btn seat ${seat.is_reserved ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => !seat.is_reserved && handleSeatSelect(seat.id)}
                        disabled={seat.is_reserved}
                      >
                        {seat.seat_number}
                      </button>
                    </td>
                  </OverlayTrigger>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeatMap;
