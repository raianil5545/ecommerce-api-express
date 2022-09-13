const express = require("express")

const { register } = require("../controllers/users/register")
const { signup_validator, login_validator } = require("../middleware/validators/user_validators")
const { login } = require("../controllers/users/login")


const user_router = express.Router()

user_router.post("/users/signup", signup_validator, register)
user_router.post("/users/login", login_validator,login)

module.exports = user_router