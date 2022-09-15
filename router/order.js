const express = require("express")


const { showOrder, createOrder } = require("../controllers/users/order")
const { auth_middleware } = require("../middleware/auth_middleware")
const order_validator = require("../middleware/validators/order")


const order_router = express.Router()

order_router.get("/order", auth_middleware, showOrder)
order_router.post("/order", auth_middleware, order_validator, createOrder)

module.exports = order_router