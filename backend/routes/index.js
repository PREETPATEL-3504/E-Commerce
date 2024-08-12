const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const productRouter = require("./product");
const cartRouter = require("./cart");
const orderRouter = require("./order");
const publicRouter = require("./public");
const wishListRouter = require("./wishList");
const mailRouter = require("./mail");

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);
router.use("/public", publicRouter);
router.use("/wishlist", wishListRouter);
router.use("/mail", mailRouter);

module.exports = router;
