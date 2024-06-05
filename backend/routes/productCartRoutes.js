const express = require('express');
const router = express.Router();
const ProductCartController = require('../controllers/productCartController');

router.post('/add-to-cart', ProductCartController.addToProductCart);
router.post('/remove-from-cart', ProductCartController.removeFromProductCart);
router.get('/cart/:userId', ProductCartController.getProductCart);
router.post('/purchase-products', ProductCartController.purchaseProducts);
router.get('/product-cart-count/:userId', ProductCartController.getProductCartCount);

module.exports = router;
