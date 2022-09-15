const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL).
then(() => {
        console.log("db connected")
    }).catch((err) => {
        console.log(err)
    })
