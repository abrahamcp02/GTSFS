const Row = require('../models/Row');

exports.createRow = (req, res) => {
  const { theaterId } = req.params;
  const { number } = req.body;
  console.log(theaterId, number);

  // Suponiendo que tienes una función en tu modelo Row para crear la fila
  Row.create(theaterId, number, (error, row) => {
      if (error) {
          res.status(500).send({ message: error.message });
      } else {
          res.status(201).send(row);
      }
  });
};

exports.deleteRow = (req, res) => {
    Row.delete(req.params.id, (error, result) => {
        if (error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(200).send(result);
        }
    });
};