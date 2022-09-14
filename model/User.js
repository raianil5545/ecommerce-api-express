const mongoose = require("mongoose");

const schema = mongoose.Schema;

const { genderEnum, roleEnum, provinceEnum } = require("../constant/userConstant")
// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

// var validateGender = function(gender){
//     return genderEnum.includes(gender);
// }

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        // validate: [validateEmail, 'Invalid email address'],
        unique: true,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        lowercase: true,
        // validate: [validateGender, "male or female only"],
        enum: genderEnum,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
        // validate: [validatePassword, "Must be 8 atleast 8 character long and contain atleast a digit, number, upper case and lowercase"]
    },
    address: {
        street: {
            type: String,
            lowercase: true,
            required: [true, "street is required field"]
        },
        city: {
            type: String, 
            lowercase: true,
            required: [true, "city is required field"]
        },
        province: {
            type: String,
            enum: provinceEnum,
            lowercase: true,
            required: [true, "province is required field"]
        }
    }, 
    role: {
        type: String,
        lowercase: true,
        enum: roleEnum,
        required: true
    }
}, {strict: true});

// userSchema.path("email").validate(async (email) => {
//     const emailcount = await mongoose.models.users.countDocuments({email});
//     return !emailcount
// }, "Email already exists")

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;