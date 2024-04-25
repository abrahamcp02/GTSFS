const db = require('../config/database');

class User{
  static getByUsername(username, callback){
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
  }

  static create(username, email, name, password, callback) {
    db.query('INSERT INTO users (username, email, name, password) VALUES (?, ?, ?, ?)', [username, email, name, password], callback);
  }
}

module.exports = User;
