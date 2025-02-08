const express = require("express");
const { PostProduct, getAllProduct, getProductById } = require("./ProductController");

const router = express.Router();

router.post("/", PostProduct);

router.get("/" , getAllProduct)

router.get("/:id", getProductById)

module.exports = router;
