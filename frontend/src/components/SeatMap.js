import React, { useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import './SeatMap.css';

const SeatMap = ({ seats, onSeatSelect }) => {
  useEffect(() => {
    // Inicializar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

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

  const renderTooltip = (seat) => (
    <Tooltip id={`tooltip-${seat.id}`}>
      {seat.is_reserved ? 'Ocupado' : `Asiento ${seat.seat_number} - $${seat.price}`}
    </Tooltip>
  );

  return (
    <div className="seat-map container">
      {sortedRows.map(row_number => (
        <div key={row_number} className="row mb-3">
          <div className="col-auto">
            <div className="row-label">Fila {row_number}</div>
          </div>
          <div className="col">
            <div className="seats d-flex flex-wrap">
              {rows[row_number].map(seat => (
                <OverlayTrigger
                  key={seat.id}
                  placement="top"
                  overlay={renderTooltip(seat)}
                >
                  <button
                    className={`btn seat ${seat.is_reserved ? 'btn-danger' : 'btn-success'} me-2 mb-2`}
                    onClick={() => !seat.is_reserved && onSeatSelect(seat.id)}
                    disabled={seat.is_reserved}
                  >
                    {seat.seat_number}
                  </button>
                </OverlayTrigger>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeatMap;
