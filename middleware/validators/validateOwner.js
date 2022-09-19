const Product  = require("../../model/Product");

const validateOwner = (req, res, next) => {
    const user_id = req?.user?.id
    const product_id = req.params.id
    Product.findById(product_id, (err, data) =>{
        if (err){
            next(err)
        }
        else{
            if (data.created_by == user_id){
                next()
            }
            else{
                res.status(403).send({msg: "unauthorized"})
            }
        }
    })

}

module.exports = validateOwner