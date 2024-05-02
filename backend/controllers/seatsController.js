const Seat = require('../models/Seat');

exports.getAvailableSeats = (req, res) => {
    const { theaterId } = req.params;
    Seat.getAllAvailable(theaterId, (error, seats) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener los asientos', error });
        }
        res.json(seats);
    });
};

exports.reserveSeat = (req, res) => {
    const { seatId } = req.params;
    Seat.reserve(seatId, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al reservar el asiento', error });
        }
        res.json({ message: 'Asiento reservado correctamente', seatId });
    });
};
