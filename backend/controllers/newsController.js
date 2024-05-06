const New = require('../models/New');

exports.getAllNews = (req, res) => {
  New.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Algo fue mal" });
    else res.send(data);
  });
};

exports.getNewsById = (req, res) => {
  New.getById(req.params.id, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send(data);
  });
};