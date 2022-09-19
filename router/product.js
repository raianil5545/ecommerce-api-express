const express = require("express");


const product_validator = require("../middleware/validators/products")
const { auth_middleware } = require("../middleware/authValidateToken")
const { get_products, create_products, get_product, update_product } = require("../controllers/users/product")
const upload = require("../utils/mutler")
const isSeller = require("../middleware/isSeller")
const validateOwner = require("../middleware/validators/validateOwner")


product_router = express.Router()


product_router.get("/seller", auth_middleware, get_products)
product_router.get("", get_products)
product_router.get("/:id", get_product)

product_router.post("", auth_middleware, upload.array("images", 5), create_products)
product_router.put("/:id", auth_middleware, isSeller,  validateOwner, upload.array("images", 5), update_product)

module.exports = product_router