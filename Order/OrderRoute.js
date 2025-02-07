const express = require("express");
const { PostOrder, GetOrder, UpdateStatus, DeleteOrder } = require("./OrderController");

const router = express.Router();

// Create Order
router.post("/order", PostOrder);

// Get Orders
router.get("/order", GetOrder);

// Update Order Status
router.patch("/order/:id", UpdateStatus);

// Delete Order
router.delete("/order/:id", DeleteOrder);

module.exports = router;
