const Product  = require("../../model/Product");
const mongoose = require("mongoose")


const get_products = async (req, res, next) => {
    
    let search_term = req.query.search_term;
    let page = req.query.page || 1;
    let per_page = req.query.per_page || 5;

    let price_from = parseFloat(req.query.price_from) || 0;
    let price_to = parseFloat(req.query.price_to) || 1E9;

    let products = await Product.aggregate([
        {
            $match: {
                "created_by": req?.user?.role === "seller" ?
                    {
                        $eq: mongoose.Types.ObjectId(req?.user?.id)
                    }
                    :
                    {
                        $ne: {},
                    }
            }
        },
        {
            $match: {
                $or: [
                    { name: { $regex: RegExp(search_term, "i") } },
                    { brands: { $regex: RegExp(search_term, "i") } },
                    { categories: { $regex: RegExp(search_term, "i") } },
                ],
                $and: [
                    {
                        price: { $gte: price_from }
                    },
                    {
                        price: { $lte: price_to }
                    }
                ]
            }
        }, {
            "$facet": {
                "metadata": [
                    { $count: "total" }, {
                        $addFields: {
                            page: page, per_page: per_page
                        }
                    }],
                "data": [
                    {
                        $skip: ((page - 1) * (per_page)),
                    },
                    {
                        $limit: parseInt(per_page)
                    }
                ]
            }
        }
    ])
    res.send(products)
}

const get_product = (req, res, next) => {
    Product.findById(req.params.id, (err, data) => {
        if (err) {
            return next(err)
        }
        return res.send(data)
    })
}

const create_products = async (req, res, next) => {
    if (req?.user?.role == "seller"){
        try{
            let images = req?.files.map(el => "uploads/" + el.filename)
            await Product.create({...req.body, images, created_by: req.userID})
            res.send({data: "product created sucessfully"})
        }
        catch (err){
            next(err)
        }
        
    }
    else{
        res.status(403).send({msg: "Forbidden"})
    }
}

const update_product = (req, res, next) => {
    let product = Product.findById(req.params.id)
    let old_images = product.images
    let images = req.files.map(el => "uploads/" + el.filename)

    Product.findByIdAndUpdate(req.params.id, {...req.body, images},
        {
            new: true,
            runValidators: true
        }, (err, data) => {
            if (err){
                return next(err)
            }
            return res.send(data)
        })
}

module.exports = {
    get_products,
    create_products,
    get_product,
    update_product
}