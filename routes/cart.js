const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Product = require('../models/product')
const User = require('../models/user')
const Cart = require('../models/cart')



// To go to cart page
router.get('/user/:userId/cart',isLoggedIn,async(req,res)=>{

    try{
        const user = await User.findById(req.params.userId).populate('cartInfo')
    
        // res.render('cart/showCart',{userCart:user.cart,cartInfo:user.cartInfo}) 
        res.render('cart/showCart',{userCart:user.cartInfo}) 
    }catch(e){
        req.flash('error','Unable to Add this Product ')
        res.render('error')
    }
    
})


// To add cart
router.post('/user/:id/cart',isLoggedIn,async(req,res)=>{

    try{

        const product = await Product.findById(req.params.id);
        const productId= req.params.id;
        const currentUser = req.user;
        const userCart = currentUser.cartInfo;

        let allCartItem = await Cart.find({})
        let isPresent = false;

        let alreadyPresentProductId = "";
        let alreadyPresentProductPrice = 0;

        for(let item of allCartItem){
            if(item.user === currentUser.username && item.productIdFromProducts === productId){
                isPresent = true;
                alreadyPresentProductId = item._id;
                alreadyPresentProductPrice = item.productPrice;
                break;
            }
        }

        if(isPresent){
            let productOnCart = await Cart.findById(alreadyPresentProductId)
            let noOfProduct = productOnCart.noOfProductInCart + 1;
            let productPrices = alreadyPresentProductPrice;
            let totalPriceOfProduct = productOnCart.productPrice + productPrices;
            await Cart.findByIdAndUpdate(alreadyPresentProductId,{$set:{noOfProductInCart:noOfProduct}});
            await Cart.findByIdAndUpdate(alreadyPresentProductId,{$set:{productPrice:totalPriceOfProduct}});

            res.redirect(`/user/${req.user._id}/cart`) 
        }else{
            const user = req.user;

            const cartItem = new Cart({
                user:req.user.username,
                img:product.img,
                productName:product.name,
                productPrice:product.price,
                noOfProductInCart:1,
                desc:product.desc,
                productIdFromProducts:productId,
                originalPrice:product.price
            })

            await cartItem.save();
            await user.save();

            user.cartInfo.push(cartItem)
            await cartItem.save();
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

    try{
        const { userid, id } = req.params;

        await User.findByIdAndUpdate(userid,{$pull:{cartInfo:id}})
        await Cart.findByIdAndDelete(id);
        // await User.updateOne({cart:Usercart},{cart:[ ]})
        
        res.redirect(`/user/${req.user._id}/cart`);
    }catch(err){
        req.flash('error','Unable to Get the Cart ')
        res.render('error')
    }

})

// To add extra item using add-sign
router.patch('/addCartItem/:id',async(req,res)=>{
    const product = await Cart.findById(req.params.id);

    let noOfProduct = product.noOfProductInCart;
    let priceOfProduct = product.originalPrice;

    noOfProduct++;
    let totalProductPrice = product.productPrice + priceOfProduct;

    await Cart.findByIdAndUpdate(req.params.id,{$set:{noOfProductInCart:noOfProduct}})
    await Cart.findByIdAndUpdate(req.params.id,{$set:{productPrice:totalProductPrice}})

    res.redirect(`/user/${req.user._id}/cart`);
}) 

// To minus extra item using minus-sign
    router.patch('/minusCartItem/:id',async(req,res)=>{

        const {id} = req.params;
        const product = await Cart.findById(id);

        let priceOfProduct = product.originalPrice;
        let noOfProduct = product.noOfProductInCart;

        if(noOfProduct === 1){
            await User.findByIdAndUpdate(req.user._id,{$pull:{id}})
            await Cart.findByIdAndDelete(id);
        }else{
            noOfProduct--;
            priceOfProduct = product.productPrice - priceOfProduct;
            await Cart.findByIdAndUpdate(req.params.id,{$set:{noOfProductInCart:noOfProduct}})
            await Cart.findByIdAndUpdate(req.params.id,{$set:{productPrice:priceOfProduct}})
        }

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