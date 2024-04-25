const Performance = require('../models/Performance');

exports.getAllPerformances = (req, res) => {
  Performance.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Algo fue mal" });
    else res.send(data);
  });
};

exports.getPerformanceById = (req, res) => {
  Performance.getById(req.params.id, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send(data);
  });
};

exports.createPerformance = (req, res) => {
  Performance.create(req.body, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Función creada correctamente!" });
  });
};

exports.updatePerformance = (req, res) => {
  Performance.update(req.params.id, req.body, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Función actualizada correctamente!" });
  });
};

exports.deletePerformance = (req, res) => {
  Performance.delete(req.params.id, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Función eliminada correctamente!" });
  });
};
