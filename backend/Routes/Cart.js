const express = require('express');
const{ addToCart, getCart, deleteItem, countItem, addQuantityToCart, minusQuantityToCart} = require('../Controller/cart');

const router = express.Router(); 

router.post('/cart', addToCart);
router.get('/cart', getCart);
router.delete('/cart/:id', deleteItem);
router.get('/cart/:id', countItem);
router.put('/cart/add/:id', addQuantityToCart);
router.put('/cart/remove/:id', minusQuantityToCart);

module.exports = router;