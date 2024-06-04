const db = require('../config/database');

class SeatModel {
  // Obtener asientos por ID de performance
  static getSeatsByPerformanceId(performanceId, callback) {
    const query = `
    SELECT seats.*, rows.row_number AS row_number, (seat_prices.is_reserved IS NOT NULL) AS is_occupied
    FROM seats
    JOIN rows ON seats.row_id = rows.id
    LEFT JOIN seat_prices ON seat_prices.seat_id = seats.id AND seat_prices.performance_id = ?
    JOIN theaters ON rows.theater_id = theaters.id
    WHERE theaters.id = (SELECT theater_id FROM performances WHERE id = ?)
  )
    `;
    db.query(query, [performanceId, performanceId], callback);
  }

  // Reservar un asiento
  static reserveSeat(seatId, userId, performanceId, callback) {
    const query = `
      INSERT INTO tickets (user_id, performance_id, seat_id, serial_number)
      VALUES (?, ?, ?, UUID())
    `;
    db.query(query, [userId, performanceId, seatId], callback);
  }

  static getSeatsByPerformanceId(performanceId, callback) {
    const query = `
      SELECT seats.*, rows.row_number AS row_number, (seat_prices.is_reserved IS NOT NULL) AS is_occupied
      FROM seats
      JOIN rows ON seats.row_id = rows.id
      LEFT JOIN seat_prices ON seat_prices.seat_id = seats.id AND seat_prices.performance_id = ?
      JOIN theaters ON rows.theater_id = theaters.id
      WHERE theaters.id = (SELECT theater_id FROM performances WHERE id = ?)
    `;
    db.query(query, [performanceId, performanceId], callback);
  }

  static create(rowId, number, callback) {
    const sql = "INSERT INTO seats (row_id, seat_number) VALUES (?, ?)";
    db.query(sql, [rowId, number], (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, { id: results.insertId, number, isReserved });
      }
    });
  }

static delete(seatId, callback) {
    const sql = "DELETE FROM seats WHERE id = ?";
    db.query(sql, [seatId], (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(null, { message: "Seat deleted", seatId });
        }
    });
}

  static updateSeat(seatId, seatData, callback) {
    const { row_id, number } = seatData;
    const query = "UPDATE seats SET row_id = ?, number = ? WHERE id = ?";
    db.query(query, [row_id, number, seatId], callback);
  }

  static getSeatsByRowIds(rowIds, callback) {
    const sql = 'SELECT * FROM seats WHERE row_id IN (?)';
    db.query(sql, [rowIds], (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results);
      }
    });
  }

  static markSeatsAsOccupied(seatIds, callback) {
    const query = 'UPDATE seat_prices SET is_reserved = 1 WHERE seat_id IN (?)';
    db.query(query, [seatIds], callback);
  }

}

module.exports = SeatModel;
