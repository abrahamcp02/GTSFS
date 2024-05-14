const db = require('../config/database');

class CartItem {
  static addToCart(userId, seatId, performanceId, callback) {
    const query = 'INSERT INTO cart (user_id, seat_id, performance_id, added_at) VALUES (?, ?, ?, ?)';
    const values = [userId, seatId, performanceId, new Date()];
    db.query(query, values, callback);
  }

  static getCartItems(userId, callback) {
    const query = 'SELECT * FROM cart WHERE user_id = ?';
    db.query(query, [userId], callback);
  }

  static clearCart(userId, callback) {
    const query = 'DELETE FROM cart WHERE user_id = ?';
    db.query(query, [userId], callback);
  }
}

module.exports = CartItem;
