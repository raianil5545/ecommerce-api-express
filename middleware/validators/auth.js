const { body } = require('express-validator');
const mongoose = require("mongoose");


const { genderEnum, roleEnum, addressEnum, provinceEnum } =require('../../constant/userConstant')
const {re_password, re_email} = require("../../constant/authConstant")
const validate = require('../../utils/validate');


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
                    throw new Error("Email is required field")
                }
                else if (!re_email.test(value)){
                    throw  new Error("Invalid Email address")
                }
                const emailcount = await mongoose.models.User.countDocuments({email: value});
                if (emailcount){
                    throw new Error("Email already exist")
                }
                return true
            }),
        body("name").exists().withMessage('Name is required Field'),
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
        body("date_of_birth").exists().withMessage('Date of Birth is required Field'),
        body("address").custom(
            address => {
                errors = []
                for (key of addressEnum){
                    if (!Object.keys(address).includes(key)){
                        let tempObj = {}
                        tempObj[key] = `${key} is required field`
                        errors.push(tempObj)
                    }
                }
                if (address["province"]){
                    if (!provinceEnum.includes(address["province"].toLowerCase())){
                        errors.push({"province": 'Invalid Province'})
                    }
                }
                if (errors.length != 0){
                    throw new Error(JSON.stringify(errors))
                }
                return true
            }
        ),
        // body("address").exists().withMessage('Address is required Field'),
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
            async value => {
                if (!value){
                    throw new Error("Email required")
                }
                if (!re_email.test(value)){
                    throw  new Error("Invalid Email address")
                }
                const emailcount = await mongoose.models.User.countDocuments({email: value});
                if(!emailcount){
                    throw new Error("User doesn't exist")
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