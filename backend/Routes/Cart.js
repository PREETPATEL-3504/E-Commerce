const express = require('express');
const AddtoCart = require('../Controller/cart');

const router = express.Router(); 

router.post('/cart', AddtoCart);

module.exports = router;