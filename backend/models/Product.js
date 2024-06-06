const db = require('../config/database');

class Product {
  static getAll(callback) {
    db.query('SELECT * FROM products', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM products WHERE id = ?', [id], callback);
  }

  static create(product, callback) {
    db.query('INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)', [product.name, product.price, product.description, product.image], callback);
  }

  static update(id, product, callback) {
    db.query('UPDATE products SET name = ?, price = ?, description = ?, image = ? WHERE id = ?', [product.name, product.price, product.description, product.image, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM products WHERE id = ?', [id], callback);
  }
}

module.exports = Product;
