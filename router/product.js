const express = require("express");


const { auth_middleware } = require("../middleware/auth_middleware")
const { get_products, create_products } = require("../controllers/product")

product_router = express.Router()


product_router.get("/products", auth_middleware, get_products)

product_router.post("/products", auth_middleware, create_products)

module.exports = product_router