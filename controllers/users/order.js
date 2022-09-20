const Order = require('../../model/Order')
const Product  = require("../../model/Product");
const User  = require("../../model/User");


const sendMail = require("../../utils/sendMail")

const showOrder = async (req, res, next) => {
    try{
        if (req.user.role == "buyer"){
            let orders = await Order.find({created_by: req.user.id})
            console.log(req.body)
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
        // need a product id too.
        if (req.user.role == "buyer"){
            let orders = req.body.products
            let order = await Order.create({...req.body, created_by: req.user.id}, (err, data) => {
                if(err){
                    return next(err)
                }
                orders.forEach(element => {
                    let sellerEmails = []
                    Product.findById(element.product_id, (err, data)=>
                    {
                        if (err){
                            return next(err)
                        }        
                        User.findById(data.created_by, (err, data) => {
                            if (err){
                                return next(err)
                            }
                            sellerEmails.push(data.email)
                        })
                    })
                    sendMail([sellerEmails], "order has been placed")
                });
                
            })
            res.send({msg: "Order has been sucessfully placed."})
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