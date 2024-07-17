const express = require('express');
const {addProduct, getProduct, deleteProduct, updateProduct, getProductbyid } = require('../Controller/Product');
const upload = require('../Controller/multerConfig');
const router = express.Router(); 

router.post('/products', upload.single('image_url'), addProduct);
router.route('/products').get(getProduct);
router.route('/products/:id').delete(deleteProduct);
router.route('/products/:id').patch(updateProduct);
router.route('/products/:id').get(getProductbyid);

module.exports = router;