const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("connection established successfully");
    })
    .catch((error)=>{
        console.log("connection not establisehd");
        console.log(error.message);
    })
}

module.exports = connectDB;