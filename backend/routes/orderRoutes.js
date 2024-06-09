const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.get('/my-orders/:userId', OrderController.getUserOrders);

module.exports = router;
