const db = require('../config/database');

class Ticket {
  static purchaseTickets(tickets, callback) {
    const query = `
      INSERT INTO tickets (id, user_id, seat_id, performance_id, serial_number)
      VALUES ?
    `;
    const values = tickets.map(ticket => [
      ticket.id,
      ticket.user_id,
      ticket.seat_id,
      ticket.performance_id,
      ticket.serial_number
    ]);

    db.query(query, [values], callback);
  }

  static getUserTickets(userId, callback) {
    const query = `
      SELECT t.*, s.row_id, s.seat_number, p.name AS performance_name, p.date AS performance_date
      FROM tickets t
      JOIN seats s ON t.seat_id = s.id
      JOIN performances p ON t.performance_id = p.id
      WHERE t.user_id = ?
    `;
    db.query(query, [userId], callback);
  }

  static deleteTicket(ticketId, callback) {
    const query = 'DELETE FROM tickets WHERE id = ?';
    db.query(query, [ticketId], callback);
  }
}

module.exports = Ticket;
