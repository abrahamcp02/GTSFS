const express = require('express');
const router = express.Router();
const PerformanceController = require('../controllers/performanceController');

router.get('/', PerformanceController.getAllPerformances);

router.get('/:id', PerformanceController.getPerformanceById);

router.get('/:performanceId/available-seats', PerformanceController.getAvailableSeats);

router.post('/', PerformanceController.createPerformance);

router.put('/:id', PerformanceController.updatePerformance);

router.delete('/:id', PerformanceController.deletePerformance);

router.get('/:performanceId/seat-prices', PerformanceController.getSeatPrices);


module.exports = router;
