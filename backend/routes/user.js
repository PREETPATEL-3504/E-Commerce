
const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controller/user');

router.post('/register', register);
router.post('/user-login', login);
router.post('/logout', logout);

module.exports = router;