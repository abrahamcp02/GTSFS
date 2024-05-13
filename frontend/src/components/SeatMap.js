import { Link } from 'react-router-dom';


const SeatMap = ({ seats, onSeatSelect }) => {
  if (!seats || !seats.length) {
    return <p>No seats available.</p>;
  }

  // Organizando los asientos por número de fila
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

  return (
    <div className="seat-map">
      {sortedRows.map(row_number => (
        <div key={row_number} className="row">
          <div className="row-label"></div>
          <div className="seats">
          Fila {row_number}
            {rows[row_number].map(seat => (
              <button
                key={seat.id}
                className={`seat ${seat.is_reserved ? 'occupied' : 'available'}`}
                onClick={() => !seat.is_reserved && onSeatSelect(seat.id)}
                disabled={seat.is_reserved}
                style={{ backgroundColor: seat.is_reserved ? 'red' : 'green' }}
              >
                {seat.seat_number}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeatMap;
