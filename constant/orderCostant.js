const { models } = require("mongoose")

const orderStatusEnum = ["pending", "rejected", "completed"]

models.exports = {
    orderStatusEnum
}