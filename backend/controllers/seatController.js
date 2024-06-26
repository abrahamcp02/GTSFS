const SeatModel = require('../models/Seat');

exports.getSeats = (req, res) => {
  SeatModel.getSeatsByPerformanceId(req.params.performanceId, (err, results) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send(results);
  });
};

exports.createSeat = (req, res) => {
  const rowId = req.params.rowId;
  const { number } = req.body;

  if (!rowId || !number) {
    return res.status(400).send({ message: 'Row ID and seat number are required.' });
  }

  SeatModel.create(rowId, { number }, (error, seat) => {
    if (error) {
      return res.status(500).send({ message: error.message });
    }
    res.status(201).send(seat);
  });
};



exports.deleteSeat = (req, res) => {
  const seatId = req.params.id;
  SeatModel.delete(seatId, (error, result) => {
    if (error) {
      return res.status(500).send({ message: error.message });
    }
    res.status(200).send(result);
  });
};

exports.updateSeat = (req, res) => {
  SeatModel.updateSeat(req.params.seatId, req.body, (err, result) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Seat updated successfully", data: result });
  });
};

exports.reserveSeat = (req, res) => {
  const { seatId, userId } = req.body;
  const { performanceId } = req.params;
  SeatModel.reserveSeat(seatId, userId, performanceId, (err, results) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      res.send({ message: 'Seat reserved successfully', data: results });
    }
  });
};
