const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seatController');
const RowController = require('../controllers/rowController')

router.post('/:rowId/seats', SeatController.createSeat);
router.get('/theater/:theaterId', RowController.getRowsByTheaterId);
router.delete('/:id', RowController.deleteRow);


module.exports = router;
