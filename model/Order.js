const mongoose = require("mongoose");

const { orderStatusEnum } = require("../constant/orderCostant")


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const OrderSchema = new Schema({
    products: [
        {
            name: {
                type: String,
                required: [true, "Missing Product Name"]
            },
            price: {
                type: Number,
                min: 0,
                required: [true, "Missing Price"]
            },
            quantity: {
                type: Number,
                min: 1,
                required: [true, "Missing Quantity"]
            },
            status: {
                type: String,
                enum: orderStatusEnum,
                lowercase: true
            }
        }
    ],
    created_by: {
        type: ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
})

orderModel = mongoose.model("Order", OrderSchema)

module.exports = orderModel