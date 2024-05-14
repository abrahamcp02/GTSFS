const express = require('express');
const router = express.Router();
const SeatPriceController = require('../controllers/seatPriceController');

router.get('/performances/:performanceId/seat-prices', SeatPriceController.getSeatPricesByPerformanceId);
router.post('/', SeatPriceController.createOrUpdatePrice);
router.delete('/', SeatPriceController.deleteSeatPrice);

module.exports = router;
