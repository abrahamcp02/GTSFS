const Performance = require('../models/Performance');

exports.getAllPerformances = (req, res) => {
  Performance.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Algo fue mal" });
    else res.send(data);
  });
};

exports.getPerformanceById = (req, res) => {
  Performance.getById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Performance with id ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Error retrieving Performance with id " + req.params.id });
      }
    } else res.send(data);
  });
};

exports.createPerformance = (req, res) => {
  // Asegúrate de que todos los campos necesarios estén incluidos en req.body
  Performance.create(req.body, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Performance created successfully!", data });
  });
};

exports.updatePerformance = (req, res) => {
  Performance.update(req.params.id, req.body, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Performance updated successfully!" });
  });
};

exports.deletePerformance = (req, res) => {
  Performance.delete(req.params.id, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Performance deleted successfully!" });
  });
};
