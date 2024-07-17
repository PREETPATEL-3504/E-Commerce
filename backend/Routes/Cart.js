const express = require('express');
const{ AddtoCart, GetCart, DeleteItem} = require('../Controller/cart');

const router = express.Router(); 

router.post('/cart', AddtoCart);
router.get('/cart', GetCart);
router.delete('/cart/:id', DeleteItem);

module.exports = router;