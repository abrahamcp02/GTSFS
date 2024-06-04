const db = require('../config/database');

class New {
  static getAll(callback) {
    db.query('SELECT * FROM news', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM news WHERE id = ?', [id], callback);
  }

  static create(news, callback) {
    db.query('INSERT INTO news (title, content, image) VALUES (?, ?, ?)', [news.title, news.content, news.image], callback);
  }

  static update(id, news, callback) {
    db.query('UPDATE news SET title = ?, content = ?, image = ? WHERE id = ?', [news.title, news.content, news.image, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM news WHERE id = ?', [id], callback);
  }
}

module.exports = New;
