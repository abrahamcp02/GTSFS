const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

// Ruta para obtener las órdenes de un usuario
router.get('/my-orders/:userId', OrderController.getUserOrders);

module.exports = router;
