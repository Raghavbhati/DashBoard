const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    "email":{
        type : String,
        required: true,
        trim: true,
        lowercase : true
    },
    "username":{
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique :true,
        index : true
    },
    "password" : {
        type : String,
        required : [true, "Password is Required"],
        trim : true
    },
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
    "phone":{
        type : Number,
        required : true,
        trim : true
    },
    "profile" : {
        type : String,
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
    },
    "refreshToken":{
        type : String
    }
},{
    timestamps : true,
})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 7)
        next()
    }
})

userSchema.methods.isPasswordCorrect = async function(email,password){
    const user = UserModel.findOne({email});
    if(!user){
        return false;
    }
    return await bcrypt.compare(password, this.password)
}

userSchema.static.generateAccessToken = function (){
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, process.env.ACCESS_TOKEN_SECRET ,{ expiresIn : process.env.ACCESS_TOKEN_EXP})
}

userSchema.static.generateRefreshToken = function (){
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRECT , {expiresIn : process.env.REFRESH_TOKEN_EXP})
}

const UserModel = mongoose.model("User", userSchema);

module.exports = {UserModel};