const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Product = require('../models/product')
const User = require('../models/user')


// To go to cart page
router.get('/user/:userId/cart',isLoggedIn,async(req,res)=>{

    try{
        const user = await User.findById(req.params.userId).populate('cart')
    
        res.render('cart/showCart',{userCart:user.cart}) 
    }catch(e){
        req.flash('error','Unable to Add this Product ')
        res.render('error')
    }
    
})


// To add cart
router.post('/user/:id/:userId/cart',isLoggedIn,async(req,res)=>{

    try{

        const product = await Product.findById(req.params.id);
        const currentUser = await User.findById(req.params.userId);
        const productId = req.params.id;
        const userCart = currentUser.cart;

        if(userCart.includes(productId)){
            console.log("hey")
            res.redirect(`/user/${req.user._id}/cart`) 
        }else{
            const user = req.user;

            user.cart.push(product)

            await user.save();

            req.flash('success','Product Added to Cart Successfully')

            res.redirect(`/user/${req.user._id}/cart`) ;      
        }

        

    }catch(e){
        req.flash('error','Unable to Get the Cart ')
        res.render('error')
    }
    
})

// Remove from cart
router.delete('/user/:userid/cart/:id', async(req, res) => {

    const { userid, id } = req.params;

    await User.findByIdAndUpdate(userid,{$pull:{cart:id}})
    // await User.updateOne({cart:Usercart},{cart:[ ]})
    
    res.redirect(`/user/${req.user._id}/cart`);
    
})


// To Buy cart products

router.get('/buyProducts/:id',async(req,res)=>{
    
    const user = await User.findById(req.params.id).populate('cart')

    res.render('products/buyThroughCart',{userCart:user.cart})
})


// Conform Order

router.get('/conformOrder/:id',async(req,res)=>{

    // console.log(req.params)

    let user = req.user;

    let Usercart = user.cart;
    let BoughtProducts = user.BoughtProducts;

    for(item of Usercart){
        BoughtProducts.unshift(item);
    }

    await User.updateOne({cart:Usercart},{cart:[ ]})

    await user.save();
    
    res.render('products/conformOrder')
})




module.exports=router;