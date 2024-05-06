const db = require('../config/database');

class SeatModel {
  // Obtener asientos por ID de performance
  static getSeatsByPerformanceId(performanceId, callback) {
    const query = `
    SELECT 
      seats.*,
      rows.row_number AS row_number,
      (tickets.id IS NOT NULL) AS is_occupied
    FROM seats
    JOIN rows ON seats.row_id = rows.id
    LEFT JOIN tickets ON tickets.seat_id = seats.id AND tickets.performance_id = ?
    JOIN theaters ON rows.theater_id = theaters.id
    WHERE theaters.id = (
      SELECT theater_id FROM performances WHERE id = ?
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
}

module.exports = SeatModel;
