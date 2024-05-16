const db = require('../config/database');

class ProductCart {
  static addToCart(userId, productId, callback) {
    const query = 'INSERT INTO product_cart (user_id, product_id) VALUES (?, ?)';
    const values = [userId, productId];
    db.query(query, values, callback);
  }

  static removeFromCart(userId, itemId, callback) {
    const query = 'DELETE FROM product_cart WHERE user_id = ? AND id = ?';
    const values = [userId, itemId];
    db.query(query, values, callback);
  }

  static getCartItems(userId, callback) {
    const query = `
      SELECT pc.id AS itemId, p.id AS product_id, p.name, p.description, p.price
      FROM product_cart pc
      JOIN products p ON pc.product_id = p.id
      WHERE pc.user_id = ?
    `;
    db.query(query, [userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }

  static clearCart(userId, callback) {
    const query = 'DELETE FROM product_cart WHERE user_id = ?';
    db.query(query, [userId], (error, results) => {
      if (error) {
        console.error('Error clearing cart:', error);
        return callback(error);
      }
      return callback(null, results);
    });
  }

  static getProductCartCount(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT COUNT(*) AS count FROM product_cart WHERE user_id = ?';
      db.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0].count);
        }
      });
    });
  }
}

module.exports = ProductCart;
