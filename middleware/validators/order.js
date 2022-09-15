const { body } = require('express-validator');

const validate = require('../../utils/validate');

const order_validator = validate(
    [
        body("products").exists().withMessage("Product fields missing").notEmpty().withMessage("No products Found")
    ]
)

module.exports = order_validator