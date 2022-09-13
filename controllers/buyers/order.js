const order = (req, res, next) => {
    res.send({data: "products", authenticated: req.authenticated, role: req.role})
}

module.exports = {
    order
}