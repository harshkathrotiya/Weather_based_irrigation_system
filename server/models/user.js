const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    //for reset password
    // token:{
    //     type:String 
    // },
    // tokenExpiredTime:{
    //     type:Date,
    // },
    image:{
        type:String,
        required:true 
    },
    location:{
        type:String,
        required:true
    },
    created_at: {
        type: Date,
        default: Date.now,
      },
    
})

module.exports = mongoose.model("User",userSchema);