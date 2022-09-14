const { model } = require('mongoose');
const moongose = require('moongose');

const Schema = moongose.Schema;
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



model.exports = moongose.model("Product", productSchema)
