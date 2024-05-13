const express = require('express');
const router = express.Router();
const RowController = require('../controllers/rowController');

router.post('/:theaterId/rows', RowController.createRow);

module.exports = router;
