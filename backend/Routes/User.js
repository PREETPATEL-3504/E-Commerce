const express = require('express');
const { register, login } = require('../Controller/user');
const router = express.Router();

router.route('/user').post(register);
router.route('/user-login').post(login);
module.exports = router;