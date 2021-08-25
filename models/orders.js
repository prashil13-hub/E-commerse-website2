const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    
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
    
})


const Order = mongoose.model('Order',orderSchema)


module.exports = Order;