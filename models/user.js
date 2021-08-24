const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
const Product = require('./product');
const Cart = require('./cart');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    profilePhoto:{
        type:String
    },
    coverPhoto:{
        type:String
    },
    cartInfo:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Cart', 
        },
        
    ],
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    BoughtProducts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Cart'
        }
    ]
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema)

module.exports=User;
