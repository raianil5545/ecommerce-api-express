const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config()

const app = express();

const user_router = require("./router/users")
const buyer_router = require("./router/buyers")

mongoose.connect('mongodb://localhost:27017/ecommerce').
then(() => {
        console.log("db connected")
    }).catch((err) => {
        console.log(err)
    })

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).send({
        data: "user here"
    })
})

// signup end point
app.use("/api", user_router)

// login end point
app.use("/api", user_router)

// buyers endpoint
app.use("/api", buyer_router)

//error handler
app.use((err, req, res, next) => {
    console.log(err.name)
    if (err.name === "ValidationError"){
        res.status(400).send({
            data: "Bad Request ",
            msg: err.message
        })
    }
    else if (err.name == "JsonWebTokenError"){
        res.status(401).send({
            data: "Unauthorized",
            msg: err.message
        })
    }
    else{
        res.status(500).send({
            data: "Internal Server Error",
            msg: err.message
        })
    }
})

app.listen(process.env.PORT, (err, data) => {
    if (err){
        console.log(err)
    }
    else{
        console.log("... listen.....")
    }
})
