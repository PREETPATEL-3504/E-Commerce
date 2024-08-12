const express = require('express');
const{ addToCart, getCart, deleteItem, countItem, addQuantityToCart, minusQuantityToCart} = require('../controller/cart');

const router = express.Router(); 

router.post('/', addToCart);
router.get('/', getCart);
router.delete('/:id', deleteItem);
router.get('/count/:id', countItem);
router.put('/increse/:id', addQuantityToCart);
router.put('/decrese/:id', minusQuantityToCart);

module.exports = router;