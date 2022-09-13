const express = require("express");

const { auth_middleware } = require("../middleware/auth_middleware")
const { order } = require("../controllers/buyers/order")

buyer_router = express.Router()


buyer_router.get("/orders", auth_middleware, order)

module.exports = buyer_router