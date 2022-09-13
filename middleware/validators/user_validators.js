const { body, validationResult } = require('express-validator');
const { re_password, re_email, genderEnum, roleEnum } =require('../../constant/userConstant')
const mongoose = require("mongoose");



const validate = validations => {
    return async(req, res, next) => {
        for (let validation of validations){
            await validation.run(req);
        }
        const errors = validationResult(req);
        if (errors.isEmpty()){
            return next()
        }
        res.status(400).json({ errors: errors.array() });
    };
};



const signup_validator = validate(
    [
        body("password").custom(
        value => {
            if (!value){
                throw new Error("Password Required")
            }
            else if (!re_password.test(value)){
                throw new Error("Must be 8 atleast 8 character long and contain atleast a digit, number, upper case and lowercase.")
            }
            return true;
        }),
        body("email").custom(
            async value => {
                if (!value){
                    throw new Error("Email required")
                }
                else if (!re_email.test(value)){
                    throw  new Error("Invalid Email address")
                }
                const emailcount = await mongoose.models.users.countDocuments({email: value});
                if (emailcount){
                    throw new Error("Email already exist")
                }
                return true
            }),
        body("first_name").exists(),
        body("gender").custom(
            value => {
                if (!value){
                    throw new Error("Gender is required field.")
                }
                if (!genderEnum.includes(value.toLowerCase())){
                    throw new Error("Gender Must be male or female")
                }
                return true
            }
        ),
        body("date_of_birth").exists(),
        body("role").custom(
            value => {
                if (!value){
                    throw new Error("Role is required Field.")
                }
                else if (!roleEnum.includes(value.toLowerCase())){
                    throw new Error("Role must be buyer or seller")
                }
                return true
            }
        )
    ]
)

const login_validator = validate(
    [
        body("email").custom(
            value => {
                if (!value){
                    throw new Error("Email required")
                }
                else if (!re_email.test(value)){
                    throw  new Error("Invalid Email address")
                }
                return true
            }),
        body("password").custom(
            value => {
                if (!value){
                    console.log("here")
                    throw new Error("Password Required")
                }
                else if (!re_password.test(value)){
                    throw new Error("Must be 8 atleast 8 character long and contain atleast a digit, number, upper case and lowercase.")
                }
                return true;
            }),
    ]
)


module.exports ={
    signup_validator,
    login_validator
}