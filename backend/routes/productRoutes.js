const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para obtener todos los productos
router.get('/', productController.getAllProducts);

// Ruta para obtener un producto por su ID
router.get('/:id', productController.getProductById);

// Ruta para crear un nuevo producto
router.post('/', productController.createProduct);

// Ruta para actualizar un producto existente
router.put('/:id', productController.updateProduct);

// Ruta para eliminar un producto
router.delete('/:id', productController.deleteProduct);

router.post('/product-cart', productController.addToProductCart);


module.exports = router;
