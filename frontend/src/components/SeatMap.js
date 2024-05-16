import React, { useState, useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getPricesByPerformanceId } from '../services/apiSeatPriceService';
import { addToCart, removeFromCart, getCart } from '../services/apiTicketService';
import { jwtDecode } from 'jwt-decode';
import './SeatMap.css';

const SeatMap = ({ seats, onSeatSelect, performanceId }) => {
  const [seatPrices, setSeatPrices] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!performanceId) {
      console.error('performanceId is undefined');
      return;
    }

    const fetchSeatPrices = async () => {
      try {
        const prices = await getPricesByPerformanceId(performanceId);
        setSeatPrices(prices);
      } catch (error) {
        console.error('Error fetching seat prices:', error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.id;
          const response = await getCart(userId);
          console.log('Fetched cart items:', response.data);

          if (response.data && response.data.length > 0) {
            console.log('Cart item structure:', response.data[0]);

            const seatIdsInCart = response.data.map(item => ({
              seat_number: parseInt(item.seat_number),
              row_number: parseInt(item.row_number)
            }));
            setSelectedSeats(seatIdsInCart);
            console.log('Selected seats:', seatIdsInCart);
          } else {
            console.warn('No items in the cart or incorrect data structure');
          }
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchSeatPrices();
    fetchCartItems();
  }, [performanceId]);

  const handleSeatSelect = async (seatId, seatNumber, rowNumber) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirige a la página de login si el usuario no está autenticado
        navigate('/login');
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const seat = { seat_number: seatNumber, row_number: rowNumber };

      if (selectedSeats.some(s => s.seat_number === seatNumber && s.row_number === rowNumber)) {
        // Si el asiento ya está seleccionado, lo eliminamos del carrito
        await removeFromCart(userId, seatId);
        setSelectedSeats(selectedSeats.filter(s => !(s.seat_number === seatNumber && s.row_number === rowNumber)));
      } else {
        // Si el asiento no está seleccionado, lo agregamos al carrito
        await addToCart(userId, seatId, performanceId);
        setSelectedSeats([...selectedSeats, seat]);
      }
      onSeatSelect(seatId);
    } catch (error) {
      console.error('Error adding/removing to/from cart:', error);
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
                        className={`btn seat ${seat.is_reserved ? 'btn-danger' : selectedSeats.some(s => s.seat_number === parseInt(seat.seat_number) && s.row_number === parseInt(seat.row_number)) ? 'btn-warning' : 'btn-success'}`}
                        onClick={() => !seat.is_reserved && handleSeatSelect(seat.id, parseInt(seat.seat_number), parseInt(seat.row_number))}
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
