const ProductCart = require('../models/ProductCart');
const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');

exports.addToProductCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await ProductCart.addToCart(userId, productId, (err, result) => {
      if (err) {
        console.error('Error adding to cart:', err);
        return res.status(500).json({ message: 'Error adding to cart', error: err });
      }
      res.status(201).json({ message: 'Product added to cart' });
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

exports.removeFromProductCart = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    await ProductCart.removeFromCart(userId, itemId, (err, result) => {
      if (err) {
        console.error('Error removing from cart:', err);
        return res.status(500).json({ message: 'Error removing from cart', error: err });
      }
      res.status(200).json({ message: 'Product removed from cart' });
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Error removing from cart', error });
  }
};


exports.getProductCart = async (req, res) => {
  const { userId } = req.params;
  try {
    await ProductCart.getCartItems(userId, (err, cartItems) => {
      if (err) {
        console.error('Error fetching cart items:', err);
        return res.status(500).json({ message: 'Error fetching cart items', error: err });
      }
      res.status(200).json(cartItems);
    });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
};

exports.purchaseProducts = async (req, res) => {
  const { userId } = req.body;
  try {
    ProductCart.getCartItems(userId, (err, cartItems) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching cart items', error: err });
      }

      const orders = cartItems.map(item => ({
        user_id: userId,
        product_id: item.id,
        order_number: uuidv4(), // Generate a unique order number
        price: item.price,
        purchased_at: new Date()
      }));

      Order.createOrder(orders, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating order', error: err });
        }

        // Clear the cart after purchase
        ProductCart.clearCart(userId, (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error clearing cart', error: err });
          }

          res.status(200).json({ message: 'Products purchased successfully', orders });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error purchasing products', error });
  }
};
