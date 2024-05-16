const db = require('../config/database');

class Order {
  static createOrder(orderData, callback) {
    const query = 'INSERT INTO orders (user_id, product_id, order_number, price, purchased_at) VALUES ?';
    const values = orderData.map(order => [
      order.user_id,
      order.product_id,
      order.order_number,
      order.price,
      order.purchased_at
    ]);
    db.query(query, [values], callback);
  }

  static getUserOrders(userId, callback) {
    const query = `
      SELECT o.*, p.name, p.description, p.price, p.image
      FROM orders o
      JOIN products p ON o.product_id = p.id
      WHERE o.user_id = ?
    `;
    db.query(query, [userId], callback);
  }
}

module.exports = Order;
