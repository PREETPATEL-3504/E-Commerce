const express = require("express");

const {orderGet, orderAdd, orderAccept, orderReject} = require("../Controller/order");
const router = express.Router();

router.get("/:id", orderGet);
router.post("/:id", orderAdd);
router.patch("/accept/:id", orderAccept);
router.patch("/reject/:id", orderReject);

module.exports = router;
