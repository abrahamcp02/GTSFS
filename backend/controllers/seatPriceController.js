const SeatPrice = require('../models/SeatPrice');

exports.getSeatPricesByPerformanceId = async (req, res) => {
  try {
    const { performanceId } = req.params;
    const seatPrices = await SeatPrice.findByPerformanceId(performanceId);
    res.status(200).json(seatPrices);
  } catch (error) {
    console.error('Error fetching seat prices:', error);
    res.status(500).json({ message: 'Error fetching seat prices' });
  }
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

exports.deleteSeatPrice = (req, res) => {
  const { seatId, performanceId } = req.body;
  SeatPrice.deletePrice(seatId, performanceId, (error, result) => {
    if (error) {
      return res.status(500).send({ message: error.message });
    }
    res.status(200).send(result);
  });
};
