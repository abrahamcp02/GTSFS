const db = require('../config/database');

class TheaterModel {
  static getAll(callback) {
    const sql = 'SELECT * FROM theaters';
    db.query(sql, (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results);
      }
    });
  }

  static create(name, address, callback) {
    const sql = 'INSERT INTO theaters (name, address) VALUES (?, ?)';
    db.query(sql, [name, address], (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, { id: results.insertId, name, address });
      }
    });
  }
}

module.exports = TheaterModel;
