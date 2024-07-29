const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: 'rzp_test_K1NWP1siSCsRLp',
  key_secret: '68hvwIZ1Y7gs4GIoyTlhfx17',
});

module.exports = instance;