const { v4: uuidv4 } = require('uuid');
const Cart = require('../models/Cart');
const Ticket = require('../models/Ticket');
const Seat = require('../models/Seat');

exports.addToCart = async (req, res) => {
  const { userId, seatId, performanceId } = req.body;

  try {
    Cart.addToCart(userId, seatId, performanceId, (err, result) => {
      if (err) {
        console.error('Error adding to cart:', err);
        return res.status(500).json({ message: 'Error adding to cart', error: err });
      }
      res.status(201).json({ message: 'Item added to cart', cartItemId: result.insertId });
    });
  } catch (error) {
    console.error('Unexpected error adding to cart:', error);
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    await Ticket.removeFromCart(userId, itemId);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

exports.getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    Cart.getCartItems(userId, (err, results) => {
      if (err) {
        console.error('Error fetching cart items:', err);
        return res.status(500).json({ message: 'Error fetching cart items', error: err });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Unexpected error fetching cart items:', error);
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
};

exports.purchaseTickets = async (req, res) => {
  const { userId } = req.body;

  try {
    Cart.getCartItems(userId, async (err, cartItems) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching cart items', error: err });
      }

      const tickets = cartItems.map(item => ({
        user_id: userId,
        seat_id: item.seat_id,
        performance_id: item.performance_id,
        serial_number: uuidv4(),
        purchased_at: new Date(),
        price: item.price
      }));

      Ticket.purchaseTickets(tickets, async (err, result) => {

        const seatIds = tickets.map(ticket => ticket.seat_id);
        Seat.markSeatsAsOccupied(seatIds, (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error marking seats as occupied', error: err });
          }

          Cart.clearCart(userId, (err) => {
            if (err) {
              return res.status(500).json({ message: 'Error clearing cart', error: err });
            }

            res.status(200).json({ message: 'Tickets purchased successfully', tickets });
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error purchasing tickets', error });
  }
};


exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    Cart.getCartItems(userId, (err, cartItems) => {
      if (err) {
        console.error('Error fetching cart items:', err);
        return res.status(500).json({ message: 'Error fetching cart items', error: err });
      }
      res.json(cartItems);
    });
  } catch (error) {
    console.error('Unexpected error fetching cart:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getUserTickets = async (req, res) => {
  const { userId } = req.params;

  try {
    Ticket.getUserTickets(userId, (err, tickets) => {
      if (err) {
        console.error('Error fetching user tickets:', err);
        return res.status(500).json({ message: 'Error fetching user tickets', error: err });
      }
      res.status(200).json(tickets);
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCartCount = async (req, res) => {
  const { userId } = req.params;
  try {
    const count = await Ticket.getCartCount(userId);
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching cart count:', error);
    res.status(500).json({ message: 'Error fetching cart count', error });
  }
};