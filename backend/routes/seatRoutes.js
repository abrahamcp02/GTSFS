const express = require('express');
const SeatController = require('../controllers/seatController');
const router = express.Router();

router.get('/:performanceId', SeatController.getSeats);
router.post('/reserve/:performanceId', SeatController.reserveSeat);
router.post('/', SeatController.createSeat);

module.exports = router;
