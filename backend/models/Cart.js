const db = require('../config/database');

class CartItem {
  static addToCart(userId, seatId, performanceId, callback) {
    const query = 'INSERT INTO cart (user_id, seat_id, performance_id) VALUES (?, ?, ?)';
    const values = [userId, seatId, performanceId];
    db.query(query, values, callback);
  }

  static removeFromCart(itemId, callback) {
    const query = 'DELETE FROM cart WHERE id = ?';
    const values = [itemId];
    db.query(query, values, callback);
  }

  static getCartItems(userId, callback) {
    const query = `
    SELECT 
      c.id,
      s.seat_number,
      s.id as seat_id,
      r.row_number,
      p.title AS performance_title,
      p.id as performance_id,
      p.performance_date AS performance_date,
      sp.price
    FROM cart c
    JOIN seats s ON c.seat_id = s.id
    JOIN \`rows\` r ON s.row_id = r.id
    JOIN performances p ON c.performance_id = p.id
    JOIN seat_prices sp ON s.id = sp.seat_id AND p.id = sp.performance_id
    WHERE c.user_id = ?
  `;
    db.query(query, [userId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }

  static clearCart(userId, callback) {
    const query = 'DELETE FROM cart WHERE user_id = ?';
    db.query(query, [userId], (error, results) => {
      if (error) {
        console.error('Error clearing cart:', error);
        return callback(error);
      }
      return callback(null, results);
    });
  }
}

module.exports = CartItem;
