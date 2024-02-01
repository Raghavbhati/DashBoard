const mongoose = require("mongoose");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

const productSchema = new mongoose.Schema({
    "productName" : {
        type : String,
        required: true,
        trim: true
    },
    "normalPrice" : {
        type : Number,
        required : true,
        trim : true,
    },
    "salePrice" : {
        type : Number,
        required : true,
        trim :true,
    },
    "category" : {
        type : String,
        required : true,
        trim : true
    }, 
    "shortDescription" : {
        type : String,
        required : true,
        trim: true,
    },
    "description": {
        type : String,
        required : true,
        trim: true,
    },
    "quantity" : {
        type : Number,
        required : true,
        trim : true,
    }, 
    "warranty" : {
        type : String,
        required : true,
        trim : true,
    },
    "color" : {
        type : String,
        required : false,
        trim : true,
    },
    "countryToOrigin" : {
        type : String,
        trim : true,
        required : true,
    },
    "seller" :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
},{
    timestamps : true,
})

productSchema.plugin(mongooseAggregatePaginate)


const ProductModel = mongoose.model("Product", productSchema)

module.exports = {ProductModel}