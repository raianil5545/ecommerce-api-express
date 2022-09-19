const express = require("express");
// const formData = require('express-form-data');

require("dotenv").config()



require('./config/db_connection')
const auth_router = require("./router/auth")
const product_router = require("./router/product")
const order_router = require("./router/order")


const app = express();

app.use(express.json());
app.use(express.static('public'))


app.get("/", (req, res) => {
    res.status(200).send({
        data: "user here"
    })
})

// signup end point
app.use("/api/users", auth_router)

// products endpoint
app.use("/api/products", product_router)


// order end points
app.use("/api/orders", order_router)

// app.use(formData.parse(options));

// app.post('/profile', upload.single('uploaded_file'), (req, res) => {
//     console.log(req.file)
//     res.send("got file")
// })

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
