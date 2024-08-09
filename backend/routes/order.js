const express = require("express");

const {orderGet, orderAdd, orderAccept, orderReject, userOrder, orderId, orderDetails} = require("../controller/order");
const router = express.Router();

router.get("/:id", orderGet);
router.post("/:id", orderAdd);
router.post("/", orderId);
router.patch("/accept/:id", orderAccept);
router.patch("/reject/:id", orderReject);
router.get("/user/:id", userOrder);
router.get("/order-details/:id", orderDetails);

module.exports = router;
