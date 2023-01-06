const express = require("express");
const { getProducts } = require("./controller");
const router = express.Router();

router.get("/products", getProducts);

module.exports = router;
