const express = require('express');
const { failedPayment } = require('../controller/mail');
const router = express.Router();

router.get('/', failedPayment);

module.exports = router;