const mongoose = require('mongoose')
const Review = require('./review')


const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        default:""
    },
    // numbetOfProductInCart:{
    //     type:Number,
    //     default:1,
    // },
    img:{
        type:String
    },
    img1:{
        type:String
    },
    img2:{
        type:String
    },
    img3:{
        type:String
    },
    categary:{
        type:String
    },
    price:{
        type:Number,
        min:0
    },
    desc:{
        type:String
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]

})


const Product = mongoose.model('Product',productSchema);

module.exports=Product;