const db = require('../config/database');

class User{
  static getByUsername(username, callback){
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
  }

  static create(userData, callback)  {
    const { username, email, name, password } = userData;
    const query = 'INSERT INTO users (username, email, name, password) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, name, password], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, { insertId: results.insertId });
    });
  }
};

module.exports = User;
