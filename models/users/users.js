const mongoose = require("mongoose");

const schema = mongoose.Schema;

let genderEnum = ["male", "female"];

// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

// var validateGender = function(gender){
//     return genderEnum.includes(gender);
// }

const userSchema = new schema({
    first_name: {
        type: String,
        required: [true, "First Name is required field"]
    },
    middle_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        // validate: [validateEmail, 'Invalid email address'],
        unique: true,
        // required: [true, "Email address is required field"]
    },
    date_of_birth: {
        type: Date,
        // required: true
    },
    gender: {
        type: String,
        lowercase: true,
        // validate: [validateGender, "male or female only"],
        enum: genderEnum,
        // required: [true, "gender is required field"]
    },
    password: {
        type: String,
        select: false
        // required: [true, "password is required field"],
        // validate: [validatePassword, "Must be 8 atleast 8 character long and contain atleast a digit, number, upper case and lowercase"]
    }, 
    role: {
        type: String,
        lowercase: true,
        enum: ["buyer", "seller"]
    }
}, {strict: true});

// userSchema.path("email").validate(async (email) => {
//     const emailcount = await mongoose.models.users.countDocuments({email});
//     return !emailcount
// }, "Email already exists")

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;