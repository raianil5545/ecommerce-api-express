const Product  = require("../model/Product");

const get_products = async (req, res, next) => {
    try{
        if (req.role == "buyer"){
            let products =  await Product.find({})
            res.send(products)
        }
        else {
            let products = await Product.find({created_by: req.userID})
            res.send(products)
        }
    }
    catch(err){
        next(err)
    }
}

const create_products = async (req, res, next) => {
    if (req.role == "seller"){
        try{
            await Product.create({...req.body, created_by: req.userID, images: req?.files})
            res.send({data: "product created sucessfully"})
        }
        catch (err){
            next(err)
        }
        
    }
    else{
        res.status(403).send({data: "Forbidden"})
    }
}

module.exports = {
    get_products,
    create_products
}