const { body } = require('express-validator');

const validate = require('../../utils/validate');


const product_validator = validate(
    [
        body("name").exists().withMessage("Product Name is required field"),
        body("price").exists().withMessage("Price is required field.")
    ]
)

module.exports = product_validator