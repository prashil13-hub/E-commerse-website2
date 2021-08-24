const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    
    user:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    originalPrice:{
        type:Number,
        required:true
    },
    noOfProductInCart:{
        type:Number,
    },
    productIdFromProducts:{
        type:String,
        required:true
    }
    

})


const Cart = mongoose.model('Cart',cartSchema)


module.exports = Cart;