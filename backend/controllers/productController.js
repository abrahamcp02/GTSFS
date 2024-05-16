const Product = require('../models/Product');
const Cart = require('../models/ProductCart');

exports.getAllProducts = (req, res) => {
  Product.getAll((err, data) => {
    if (err) res.status(500).send({ message: err.message || "Algo fue mal" });
    else res.send(data);
  });
};

exports.getProductById = (req, res) => {
  Product.getById(req.params.id, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send(data);
  });
};

exports.createProduct = (req, res) => {
  Product.create(req.body, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Producto creado correctamente!" });
  });
};

exports.updateProduct = (req, res) => {
  Product.update(req.params.id, req.body, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Producto actualizado correctamente!" });
  });
};

exports.deleteProduct = (req, res) => {
  Product.delete(req.params.id, (err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.send({ message: "Producto eliminado correctamente!" });
  });
};

exports.addToProductCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await Cart.addToCart(userId, productId);
    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};