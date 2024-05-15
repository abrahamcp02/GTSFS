const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticketController');

// Ruta para añadir tickets al carrito
router.post('/add-to-cart', TicketController.addToCart);

// Ruta para eliminar tickets del carrito
router.post('/remove-from-cart', TicketController.removeFromCart);

// Ruta para obtener los ítems del carrito
router.get('/cart/:userId', TicketController.getCartItems);

// Ruta para comprar tickets
router.post('/purchase', TicketController.purchaseTickets);

module.exports = router;
