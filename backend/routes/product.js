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

router.post("/", upload.single("image_url"), addProduct);
router.route("/").get(verifyToken, getProduct);
router.route("/:id").delete(verifyToken, deleteProduct);
router.route("/:id").patch(verifyToken, updateProduct);
router.route("/id/:id").get(getProductbyid);

module.exports = router;
