const express = require('express');
const router = express.Router();
const SeatPriceController = require('../controllers/seatPriceController');

router.get('/performance/:performanceId', SeatPriceController.getPricesByPerformanceId);
router.post('/', SeatPriceController.createOrUpdatePrice);
router.delete('/', SeatPriceController.deleteSeatPrice);

module.exports = router;
