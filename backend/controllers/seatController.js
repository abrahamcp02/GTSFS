const SeatModel = require('../models/Seat');

class SeatController {
  // Obtener asientos
  static getSeats(req, res) {
    SeatModel.getSeatsByPerformanceId(req.params.performanceId, (err, results) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send(results);
      }
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
