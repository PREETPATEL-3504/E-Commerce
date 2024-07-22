const express = require("express");

const {orderGet, orderAdd} = require("../Controller/order");
const router = express.Router();

router.get("/:id", orderGet);
router.post("/:id", orderAdd);

module.exports = router;
