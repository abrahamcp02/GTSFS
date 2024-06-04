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

exports.createNews = (req, res) => {
  New.create(req.body, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Noticia creada correctamente!" });
  });
};

exports.updateNews = (req, res) => {
  New.update(req.params.id, req.body, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Noticia actualizada correctamente!" });
  });
};

exports.deleteNews = (req, res) => {
  New.delete(req.params.id, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Noticia eliminada correctamente!" });
  });
};
