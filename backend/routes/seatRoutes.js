const express = require('express');
const SeatController = require('../controllers/seatController');
const router = express.Router();

router.get('/:performanceId', SeatController.getSeats);
router.post('/reserve/:performanceId', SeatController.reserveSeat);
router.post('/rows/:rowId/seats', SeatController.createSeat);
router.delete('/:id', SeatController.deleteSeat);

module.exports = router;
