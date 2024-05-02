import React from 'react';

const SeatMap = ({ seats, onSeatSelect }) => {
  return (
    <div className="seat-map">
      {seats.map((seat) => (
        <button
          key={seat.id}
          className={`seat ${seat.is_reserved ? 'true' : 'false'}`}
          onClick={() => !seat.is_reserved && onSeatSelect(seat.id)}
          disabled={seat.is_reserved}
          style={{ backgroundColor: seat.is_reserved ? 'red' : 'green' }}
        >
          {seat.seat_number}
        </button>
      ))}
    </div>
  );
};

export default SeatMap;
