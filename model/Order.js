const moongose = required("moongose");

const { orderStatusEnum } = require("../constant/orderCostant")


const Schema = moongose.Schema;
const ObjectId = Schema.ObjectId;


const OrderSchema = new Schema({
    products: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                min: 0,
                required: true
            },
            quantity: {
                type: Number,
                min: 1,
                required: true
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

orderModel = moongose.model("Order", OrderSchema)

module.exports = orderModel