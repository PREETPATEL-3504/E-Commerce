const express = require("express");
const {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductbyid,
} = require("../controller/product");
const upload = require("../controller/multerConfig");
const verifyToken = require("../middleware/jwtVerify");
const router = express.Router();

router.post("/products", upload.single("image_url"), addProduct);
router.route("/products").get(verifyToken, getProduct);
router.route("/products/:id").delete(verifyToken, deleteProduct);
router.route("/products/:id").patch(verifyToken, updateProduct);
router.route("/products/:id").get(verifyToken, getProductbyid);

module.exports = router;
