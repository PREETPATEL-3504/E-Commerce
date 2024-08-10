const express = require('express');
const router = express.Router();
const {add, get, remove} = require('../controller/wishList');

router.post('/add', add);
router.get('/:id', get);
router.delete('/:id', remove);

module.exports = router;
