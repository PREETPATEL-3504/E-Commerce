const express = require('express');
const {AddProduct, GetProduct, deleteProduct, updateProduct, getProductbyid } = require('../Controller/Product');
const router = express.Router(); 

router.route('/products').post(AddProduct);
router.route('/products').get(GetProduct);
router.route('/products/:id').delete(deleteProduct);
router.route('/products/:id').patch(updateProduct);
router.route('/products/:id').get(getProductbyid);

module.exports = router;