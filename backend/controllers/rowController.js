const Row = require('../models/Row');
const Seat = require('../models/Seat');

exports.createRow = (req, res) => {
  const { theaterId } = req.params;
  const { number } = req.body;
  
  Row.create(theaterId, number, (error, row) => {
      if (error) {
          res.status(500).send({ message: error.message });
      } else {
          res.status(201).send(row);
      }
  });
};

exports.deleteRow = (req, res) => {
    const rowId = req.params.id;
    Row.delete(rowId, (error, result) => {
      if (error) {
        return res.status(500).send({ message: error.message });
      }
      res.status(200).send(result);
    });
  };

exports.getRowsByTheaterId = (req, res) => {
    const theaterId = req.params.theaterId;
    Row.getRowsByTheaterId(theaterId, (error, rows) => {
      if (error) {
        return res.status(500).send({ message: error.message });
      }
  
      const rowIds = rows.map(row => row.id);
      Seat.getSeatsByRowIds(rowIds, (seatError, seats) => {
        if (seatError) {
          return res.status(500).send({ message: seatError.message });
        }
  
        const mappedSeats = seats.map(seat => ({
          id: seat.id,
          number: seat.seat_number, 
          row_id: seat.row_id,
          theater_id: seat.theater_id,
          category: seat.category,
          is_reserved: seat.is_reserved
        })).sort((a, b) => a.number - b.number);
  
        const rowsWithSeats = rows.map(row => ({
          ...row,
          seats: mappedSeats.filter(seat => seat.row_id === row.id)
        })).sort((a, b) => a.row_number - b.row_number);
  
        res.send(rowsWithSeats);
      });
    });
  };
  
  