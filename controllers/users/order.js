const Order = require('../../model/Order')


const showOrder = async (req, res, next) => {
    try{
        if (req.user.role == "buyer"){
            let orders = await Order.find({created_by: req.user.id})
            res.send(orders)
        }
        else {
            res.status(403).send({msg: "Forbidden"})
        }
    }
    catch(err)
    {
        next(err)
    }
}

const createOrder = async (req, res, next) => {
    try {
        if (req.user.role == "buyer"){
            let order = await Order.create({...req.body, created_by: req.user.id})
            res.send({msg: "order submitted sucessfully"})
        }
        else{
            res.status(403).send({msg: "Forbidden"})
        }
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    showOrder,
    createOrder
}