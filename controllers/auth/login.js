const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const User  = require("../../model/User");

const login = async (req, res, next) => {
    try {
        let email = req.body.email;
        let user = await User.findOne({email}).select("password email id role");
        user_obj = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        let user_valid = bcrypt.compareSync(req.body.password, user.password);
        if (user_valid){
            token = jwt.sign(user_obj, "shhhhh", { expiresIn: '1h' });
            return res.send(
                {
                    access_token: token,
                    role: user.role
                }
            )
        }
        return res.status(401).send(
            {
                msg: "Invalid Credentials"
            }
        )
    }
    catch (err){
        next(err)
    }
}

module.exports ={
    login
}