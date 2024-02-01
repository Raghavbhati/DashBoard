const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "companyName" : {
        type : String,
        required: true,
        trim: true
    },
    "sellerName":{
        type : String,
        required: true,
        trim: true
    },
    "email":{
        type : String,
        required: true,
        trim: true,
        lowercase : true
    },
    "phone":{
        type : Number,
        required : true,
        trim : true
    },
    "password" : {
        type : String,
        required : [true, "Password is Required"],
        trim : true
    },
    "addressLineOne" : {
        type : String,
        required : true,
        trim : true
    },
    "addressLineTwo":{
        type : String,
        required : false,
        trim : true
    },
    "city":{
        type : String,
        required: true,
        trim: true
    },
    "state":{
        type : String,
        required: true,
        trim: true
    },
    "country":{
        type : String,
        required: true,
        trim: true
    },
    "pincode":{
        type : String,
        required: true,
        trim: true
    }
},{
    timestamps : true,
})

const UserModel = mongoose.model("user", userSchema);

module.exports = {UserModel};