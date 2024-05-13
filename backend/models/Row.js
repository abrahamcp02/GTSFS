const db = require('../config/database');

class Row {
    static create(theaterId, number, callback) {
        db.query('INSERT INTO rows (theater_id, row_number) VALUES (?, ?)', [theaterId, number], (error, results) => {
            if (error) {
                callback(error);
            } else {
                callback(null, { id: results.insertId, number });
            }
        });
    }

    static delete(rowId, callback) {
        const sql = "DELETE FROM rows WHERE id = ?";
        db.query(sql, [rowId], (error, results) => {
            if (error) {
                callback(error);
            } else {
                callback(null, { message: "Row deleted", rowId });
            }
        });
    }
}

module.exports = Row;
