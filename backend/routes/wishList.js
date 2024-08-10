const express = require('express');
const router = express.Router();
const {add, get, remove, count} = require('../controller/wishList');

router.post('/add', add);
router.get('/:id', get);
router.delete('/:id', remove);
router.get('/count/:id', count);

module.exports = router;
