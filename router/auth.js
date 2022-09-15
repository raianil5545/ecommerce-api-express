const express = require("express")

const { register } = require("../controllers/users/register")
const { signup_validator, login_validator } = require("../middleware/validators/auth")
const { login } = require("../controllers/users/login")


const auth_router = express.Router()

auth_router.post("/users/signup", signup_validator, register)
auth_router.post("/users/login", login_validator,login)

module.exports = auth_router