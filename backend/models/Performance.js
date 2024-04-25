const db = require('../config/database');

class Performance {
  static getAll(callback) {
    db.query('SELECT * FROM performances', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM performances WHERE id = ?', [id], callback);
  }

  static create(performance, callback) {
    db.query('INSERT INTO performances (title, description, performance_date, theater_id) VALUES (?, ?, ?, ?)', [performance.title, performance.description, performance.date	, performance.theater], callback);
  }

  static update(id, performance, callback) {
    db.query('UPDATE performances SET title = ?, description = ?, performance_date = ?, theater_id = ? WHERE id = ?', [performance.title, performance.description, performance.date	, performance.theater, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM performances WHERE id = ?', [id], callback);
  }
}

module.exports = Performance;
