const ProductCart = require('../models/ProductCart');
const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');

exports.addToProductCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await new Promise((resolve, reject) => {
      ProductCart.addToCart(userId, productId, (err, result) => {
        if (err) {
          console.error('Error adding to cart:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

exports.removeFromProductCart = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    await new Promise((resolve, reject) => {
      ProductCart.removeFromCart(userId, itemId, (err, result) => {
        if (err) {
          console.error('Error removing from cart:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Error removing from cart', error });
  }
};

exports.getProductCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cartItems = await new Promise((resolve, reject) => {
      ProductCart.getCartItems(userId, (err, results) => {
        if (err) {
          console.error('Error fetching cart items:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
};

exports.purchaseProducts = async (req, res) => {
  const { userId } = req.body;
  try {
    const cartItems = await new Promise((resolve, reject) => {
      ProductCart.getCartItems(userId, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    const orders = cartItems.map(item => ({
      user_id: userId,
      product_id: item.product_id,
      order_number: uuidv4(),
      price: item.price,
      purchased_at: new Date()
    }));

    await new Promise((resolve, reject) => {
      Order.createOrder(orders, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    await new Promise((resolve, reject) => {
      ProductCart.clearCart(userId, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    res.status(200).json({ message: 'Products purchased successfully', orders });
  } catch (error) {
    console.error('Error purchasing products:', error);
    res.status(500).json({ message: 'Error purchasing products', error });
  }
};

exports.getProductCartCount = async (req, res) => {
  const { userId } = req.params;
  try {
    const count = await ProductCart.getProductCartCount(userId);
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching product cart count:', error);
    res.status(500).json({ message: 'Error fetching product cart count', error });
  }
};
