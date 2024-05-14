const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seatController');

router.post('/:rowId/seats', SeatController.createSeat);

module.exports = router;
