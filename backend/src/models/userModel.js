const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:[true,"username already taken"]

    },
    email:{
        required:true,
        unique: [true,"Account already exists with same email"],
        type:String
    },password:{
        required:true,
        type:String
    }

})

const userModel = mongoose.model("user",userSchema)

module.exports= userModel