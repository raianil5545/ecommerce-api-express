const isSeller = (req, res, next) => {
    if (req.role == "seller"){
        next()
    }
    else{
        res.status(403).send({msg: "unauthorized"})
    }
}

module.exports = isSeller