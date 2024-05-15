const db = require('../config/database');

class Performance {
  static getAll(callback) {
    db.query('SELECT * FROM performances', (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  }

  static getById(id, callback) {
    db.query('SELECT * FROM performances WHERE id = ?', [id], callback);
  }

  static create(performance, callback) {
    // Asegúrate de que todos los parámetros necesarios están incluidos
    db.query('INSERT INTO performances (title, description, performance_date, theater_id, image, video) VALUES (?, ?, ?, ?, ?, ?)',
      [performance.title, performance.description, performance.performance_date, performance.theater_id, performance.image, performance.video], callback);
  }

  static update(id, performance, callback) {
    db.query('UPDATE performances SET title = ?, description = ?, performance_date = ?, theater_id = ? , image = ?, video = ? WHERE id = ?',
      [performance.title, performance.description, performance.performance_date, performance.theater_id, performance.image, performance.video, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM performances WHERE id = ?', [id], callback);
  }
}

module.exports = Performance;
