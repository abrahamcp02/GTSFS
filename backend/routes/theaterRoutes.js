const express = require('express');
const router = express.Router();
const RowController = require('../controllers/rowController');
const TheaterController = require('../controllers/theaterController');

router.post('/:theaterId/rows', RowController.createRow);
router.get('/', TheaterController.getTheaters);
router.post('/', TheaterController.createTheater);

module.exports = router;
