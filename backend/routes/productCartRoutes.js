const express = require('express');
const router = express.Router();
const ProductCartController = require('../controllers/productCartController');

router.post('/add-to-cart', ProductCartController.addToProductCart);
router.post('/remove-from-cart', ProductCartController.removeFromProductCart);
router.get('/cart/:userId', ProductCartController.getProductCart);
router.post('/purchase', ProductCartController.purchaseProducts);

module.exports = router;
