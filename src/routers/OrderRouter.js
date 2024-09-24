const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const { authUserMiddleWare } = require("../middleware/auth");

router.post("/create", authUserMiddleWare, orderController.createOrder);

module.exports = router;
