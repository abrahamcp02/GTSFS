const express = require('express');
const router = express.Router();
const PerformanceController = require('../controllers/performanceController');

// Ruta para obtener todas las funciones
router.get('/', PerformanceController.getAllPerformances);

// Ruta para obtener una función por su ID
router.get('/:id', PerformanceController.getPerformanceById);

// Ruta para crear una nueva función
router.post('/', PerformanceController.createPerformance);

// Ruta para actualizar una función existente
router.put('/:id', PerformanceController.updatePerformance);

// Ruta para eliminar una función
router.delete('/:id', PerformanceController.deletePerformance);

router.get('/:performanceId/seat-prices', PerformanceController.getSeatPrices);


module.exports = router;
