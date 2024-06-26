const db = require('../config/database');

class SeatPrice {
  static getPricesByPerformanceId(performanceId, callback) {
    const query = `
      SELECT seatDetails.*, seats.row_id, seats.seat_number
      FROM seatDetails
      JOIN seats ON seatDetails.seat_id = seats.id
      WHERE seatDetails.performance_id = ?
    `;
    db.query(query, [performanceId], callback);
  }

  static createPrice(seatId, performanceId, price, callback) {
    const sql = "INSERT INTO seatDetails (seat_id, performance_id, price) VALUES (?, ?, ?)";
    db.query(sql, [seatId, performanceId, price], (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(null, { id: results.insertId, seatId, performanceId, price });
        }
    });
  }

  static updatePrice(seatId, performanceId, price, callback) {
    const query = "UPDATE seatDetails SET price = ? WHERE seat_id = ? AND performance_id = ?";
    db.query(query, [price, seatId, performanceId], callback);
  }

  static deletePrice(seatId, performanceId, callback) {
    const sql = "DELETE FROM seatDetails WHERE seat_id = ? AND performance_id = ?";
    db.query(sql, [seatId, performanceId], (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(null, { message: "Seat price deleted", seatId, performanceId });
        }
    });
  }

  static async findByPerformanceId(performanceId) {
    const query = 'SELECT * FROM seatDetails WHERE performance_id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [performanceId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = SeatPrice;
