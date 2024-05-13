const SeatModel = require('../models/Seat');

class SeatController {
  // Obtener asientos
  static getSeats(req, res) {
    SeatModel.getSeatsByPerformanceId(req.params.performanceId, (err, results) => {
      if (err) res.status(500).send({ message: err.message });
      else res.send(results);
    });
  }

  static createSeat(req, res) {
    SeatModel.create(req.body.rowId, req.body.number, req.body.isReserved, (error, seat) => {
      if (error) {
          res.status(500).send({ message: error.message });
      } else {
          res.status(201).send(seat);
      }
    });
  }
  
  static deleteSeat(req, res) {
    SeatModel.delete(req.params.id, (error, result) => {
      if (error) {
          res.status(500).send({ message: error.message });
      } else {
          res.status(200).send(result);
      }
  });
  }

  static updateSeat(req, res) {
    SeatModel.updateSeat(req.params.seatId, req.body, (err, result) => {
      if (err) res.status(500).send({ message: err.message });
      else res.send({ message: "Seat updated successfully", data: result });
    });
  }

  // Reservar un asiento
  static reserveSeat(req, res) {
    const { seatId, userId } = req.body;
    const { performanceId } = req.params;
    SeatModel.reserveSeat(seatId, userId, performanceId, (err, results) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send({ message: 'Seat reserved successfully', data: results });
      }
    });
  }
}

module.exports = SeatController;
