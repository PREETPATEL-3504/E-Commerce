
const express = require('express');
const router = express.Router();
const { register, login } = require('../Controller/user');

router.post('/register', register);
router.post('/user-login', login);

module.exports = router;