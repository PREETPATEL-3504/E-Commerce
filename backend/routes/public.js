
const express = require('express');
const router = express.Router();
const payment = require('../controller/public');

router.post('/payment-webhook', payment);

module.exports = router;