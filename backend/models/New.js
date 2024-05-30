const db = require('../config/database');

class New {
  static getAll(callback) {
    db.query('SELECT * FROM news', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM news WHERE id = ?', [id], callback);
  }

  static create(news, callback) {
    db.query('INSERT INTO news (title, content, image, user_id) VALUES (?, ?, ?, ?,)', [news.title, news.content, news.image, news.user_id,], callback);
  }

  static update(news, id, callback) {
    db.query('UPDATE news SET title = ?, content = ?, image = ?, user_id = ? WHERE id = ?', [news.title, news.content, news.image, news.user_id,  id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM news WHERE id = ?', [id], callback);
  }
}

module.exports = New;
