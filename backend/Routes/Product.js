const express = require('express');
const {AddProduct, GetProduct, deleteProduct, updateProduct, getProductbyid } = require('../Controller/Product');
const upload = require('../Controller/multerConfig');
const router = express.Router(); 

router.post('/products', upload.single('image_url'), AddProduct);
router.route('/products').get(GetProduct);
router.route('/products/:id').delete(deleteProduct);
router.route('/products/:id').patch(updateProduct);
router.route('/products/:id').get(getProductbyid);

module.exports = router;