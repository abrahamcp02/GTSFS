const db = require('../config/database');

class Performance {
  static getById(id, callback) {
    const query = `
      SELECT performances.*, theaters.address, theaters.name 
      FROM performances 
      JOIN theaters ON performances.theater_id = theaters.id 
      WHERE performances.id = ?`;
    db.query(query, [id], callback);
  }
  
  static getAll(callback) {
    const query = `
      SELECT performances.*, theaters.address, theaters.name 
      FROM performances 
      JOIN theaters ON performances.theater_id = theaters.id`;
    db.query(query, callback);
  }

  static create(performance, callback) {
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
