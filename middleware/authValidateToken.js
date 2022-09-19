var jwt = require('jsonwebtoken');

const auth_middleware =  (req, res, next) => {
    try {
        if (!req.headers.authorization){
            return res.status(403).send({error: "No credentials sent."})
        }
        token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
            if (err) {
                return next(err)
            }
            req["user"] = {"id": decoded.id, "role":decoded.role}
            next()
          });
    }
    catch (err){
        next(err);
    }
}

module.exports = {
    auth_middleware
}