
const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../Controller/user');

router.post('/register', register);
router.post('/user-login', login);
router.post('/logout', logout);

module.exports = router;