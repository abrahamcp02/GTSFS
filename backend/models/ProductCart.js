const db = require('../config/database');

class ProductCart {
  static addToCart(userId, productId, callback) {
    const query = 'INSERT INTO productCartLines (user_id, product_id) VALUES (?, ?)';
    const values = [userId, productId];
    db.query(query, values, callback);
  }

  static removeFromCart(userId, itemId, callback) {
    const query = 'DELETE FROM productCartLines WHERE user_id = ? AND id = ?';
    const values = [userId, itemId];
    db.query(query, values, callback);
  }

  static getCartItems(userId, callback) {
    const query = `
      SELECT pc.id AS itemId, p.id AS product_id, p.name, p.description, p.price
      FROM productCartLines pc
      JOIN products p ON pc.product_id = p.id
      WHERE pc.user_id = ?
    `;
    db.query(query, [userId], callback);
  }

  static clearCart(userId, callback) {
    const query = 'DELETE FROM productCartLines WHERE user_id = ?';
    db.query(query, [userId], callback);
  }

  static getProductCartCount(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT COUNT(*) AS count FROM productCartLines WHERE user_id = ?';
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
