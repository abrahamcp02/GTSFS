const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticketController');

router.post('/add-to-cart', TicketController.addToCart);

router.post('/remove-from-cart', TicketController.removeFromCart);

router.get('/cart/:userId', TicketController.getCartItems);

router.post('/purchase', TicketController.purchaseTickets);

router.get('/my-tickets/:userId', TicketController.getUserTickets);

router.get('/cart-count/:userId', TicketController.getCartCount);



module.exports = router;
