const express = require('express');
const router = express.Router();
const RowController = require('../controllers/rowController');

router.post('/', RowController.createRow);

module.exports = router;
