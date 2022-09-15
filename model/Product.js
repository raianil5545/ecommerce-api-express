const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    in_stock: {
        type: Number,
        default: 0,
        min: 0
    },
    brands: {
        type: Array
    },
    categories: [],
    images: [],
    created_by: {
        type: ObjectId,
        ref: "User",
        required: true
    }
    },
    {
        timestamps: true
})

const productModel = mongoose.model("Product", productSchema)
module.exports = productModel
