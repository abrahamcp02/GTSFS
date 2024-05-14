const TheaterModel = require('../models/Theater');

exports.getTheaters = (req, res) => {
  TheaterModel.getAll((error, theaters) => {
    if (error) {
      return res.status(500).send({ message: error.message });
    }
    res.send(theaters);
  });
};

exports.createTheater = (req, res) => {
  const { name, address } = req.body;
  if (!name || !address) {
    return res.status(400).send({ message: 'Name and address are required.' });
  }

  TheaterModel.create(name, address, (error, theater) => {
    if (error) {
      return res.status(500).send({ message: error.message });
    }
    res.status(201).send(theater);
  });
};
