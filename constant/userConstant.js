// passsword pattern rule
const re_password =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

// email pattern rule
const re_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// gender enum
const genderEnum = ["male", "female"];

// user role enum
const roleEnum = ["buyer", "seller"]


module.exports ={
    re_password,
    re_email,
    genderEnum,
    roleEnum
}