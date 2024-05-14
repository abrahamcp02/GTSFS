const SeatPrice = require('../models/SeatPrice');

// Obtener precios por ID de función
exports.getPricesByPerformanceId = (req, res) => {
  SeatPrice.getPricesByPerformanceId(req.params.performanceId, (err, results) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send(results);
  });
};

exports.createOrUpdatePrice = (req, res) => {
    const { seatId, performanceId, price } = req.body;
    SeatPrice.updatePrice(seatId, performanceId, price, (error, result) => {
      if (error || result.affectedRows === 0) {
        SeatPrice.createPrice(seatId, performanceId, price, (createError, createResult) => {
          if (createError) return res.status(500).send({ message: createError.message });
          res.status(201).send(createResult);
        });
      } else {
        res.send(result);
      }
    });
  };

// Eliminar el precio de un asiento
exports.deleteSeatPrice = (req, res) => {
  const { seatId, performanceId } = req.body;
  SeatPrice.deletePrice(seatId, performanceId, (error, result) => {
    if (error) {
      return res.status(500).send({ message: error.message });
    }
    res.status(200).send(result);
  });
};
