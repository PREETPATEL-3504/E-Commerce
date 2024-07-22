const express = require("express");

const {orderGet, orderAdd, orderAccept, orderReject, userOrder} = require("../Controller/order");
const router = express.Router();

router.get("/:id", orderGet);
router.post("/:id", orderAdd);
router.patch("/accept/:id", orderAccept);
router.patch("/reject/:id", orderReject);
router.get("/user/:id", userOrder);

module.exports = router;
