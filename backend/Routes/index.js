const express = require("express");
const router = express.Router();

const userRouter = require("./User");
const productRouter = require("./Product");
const cartRouter = require("./Cart");
const orderRouter = require("./order");

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);

module.exports = router;
