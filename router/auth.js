const express = require("express")

const { register } = require("../controllers/auth/register")
const { signup_validator, login_validator } = require("../middleware/validators/auth")
const { login } = require("../controllers/auth/login")


const auth_router = express.Router()

auth_router.post("/signup", signup_validator, register)
auth_router.post("/login", login_validator,login)

module.exports = auth_router