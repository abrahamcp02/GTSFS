const { v4: uuidv4 } = require('uuid');
const Cart = require('../models/Cart');
const Ticket = require('../models/Ticket');

exports.addToCart = async (req, res) => {
  const { userId, seatId, performanceId } = req.body;

  try {
    Cart.addToCart(userId, seatId, performanceId, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error adding to cart', error: err });
      }
      res.status(201).json({ message: 'Item added to cart', cartItemId: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

exports.getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    Cart.getCartItems(userId, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching cart items', error: err });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
};

exports.purchaseTickets = async (req, res) => {
  const { userId } = req.body;

  try {
    Cart.getCartItems(userId, (err, cartItems) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching cart items', error: err });
      }

      const tickets = cartItems.map(item => ({
        id: uuidv4(),
        user_id: userId,
        seat_id: item.seat_id,
        performance_id: item.performance_id,
        serial_number: uuidv4()
      }));

      Ticket.purchaseTickets(tickets, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error purchasing tickets', error: err });
        }

        Cart.clearCart(userId, (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error clearing cart', error: err });
          }

          res.status(200).json({ message: 'Tickets purchased successfully', tickets });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error purchasing tickets', error });
  }
};
