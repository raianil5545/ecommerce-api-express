const bcrypt = require('bcrypt');

const User  = require("../../model/User");

const register = (req, res, next) => {
        try{
            const hash_password = bcrypt.hashSync(req.body.password, 10);
            req["body"]["password"] = hash_password
            let user = User.create(req.body, (err, data) => {
                if (err) {
                    next(err)
                } else {
                    // user = data.toObjects()
                    user = data.toObject()
                    delete user.password
                    res.send({ user })
                }
            })
    
        }
        catch(err){
            next(err)
        }
    }

module.exports = {
    register
}