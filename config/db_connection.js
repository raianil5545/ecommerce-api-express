const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerce').
then(() => {
        console.log("db connected")
    }).catch((err) => {
        console.log(err)
    })
