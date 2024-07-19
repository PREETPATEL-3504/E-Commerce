const express = require("express");
const {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductbyid,
} = require("../Controller/Product");
const upload = require("../Controller/multerConfig");
const verifyToken = require("../middelware/jwtVerify");
const router = express.Router();

router.post("/products", upload.single("image_url"), addProduct);
router.route("/products").get(verifyToken, getProduct);
router.route("/products/:id").delete(verifyToken, deleteProduct);
router.route("/products/:id").patch(verifyToken, updateProduct);
router.route("/products/:id").get(verifyToken, getProductbyid);

module.exports = router;
