const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const Order = require('../models/orders');
const {isLoggedIn} =require('../middleware');


// Display all the products

router.get('/products',async(req,res)=>{

    try{
        const products= await Product.find({categary:'new arival'})

        const galleryProducts= await Product.find({categary:'gallery'})

        // console.log(products)

        // res.render('products/index',{products,msg:req.flash('success')})
        res.render('products/index',{products,galleryProducts})
    }catch(e){
        console.log("Something Went Wrong")
        req.flash('error','Cannot Find Products')
        res.render('error')
    }
    
})


// Create the form for new products

router.get('/products/new', isLoggedIn ,async(req,res)=>{ 

    res.render('products/new'); 
})

// Create new product

router.post('/products',isLoggedIn,async(req,res)=>{

    try{
        // console.log(req.body)
        await Product.create(req.body.product)
        req.flash('success','Product Created Successfully')
        res.redirect('products')
    }catch(e){
        console.log(e.massage)
        req.flash('error','Cannot Create Product, Something is Wrong')
        res.render('error')
    }
    
})

// Contact Us Section
router.get('/contactUs',(req,res)=>{
    res.render('products/contactUs')
})

// Contact us resolve
router.get('/contactUsResolve',isLoggedIn,(req,res)=>{
    res.render('products/contactUsResolve')
})


// To show perticular product

router.get('/products/:id',async(req,res)=>{

    try{
        const product= await Product.findById(req.params.id).populate('reviews')
        let val ="jay hind" ;
        res.render('products/show',{product,val});
    }
    catch(e){
        console.log(e.massage)
        req.flash('error','Cannot Find this Product')
        res.redirect('/error')
    }   
})

// To edit perticular product

router.get('/products/:id/edit',isLoggedIn,async(req,res)=>{

    try{
        const product= await Product.findById(req.params.id)
        // console.log(req.params.id)
        res.render('products/edit',{product})
    }catch(e){
        console.log(e.massage)
        req.flash('error','Something Went Wrong')
        res.redirect('/error')
    }
    
})

router.patch('/products/:id',isLoggedIn,async (req,res)=>{

    try{
        
        await Product.findByIdAndUpdate(req.params.id,req.body.product)

        req.flash('success','Product Updated Successfully')

        res.redirect(`/products/${req.params.id}`)
    }catch(e){
        console.log(e.massage)
        req.flash('error','Cannot Edit this Product')
        res.redirect('/error')
    }
  
})

// To buy perticular product
router.get('/buyProduct/:id', isLoggedIn,async(req,res)=>{
    const product= await Product.findById(req.params.id);
    res.render('products/buySingleProduct',{product})
})

// To conform single order
router.get('/conformSingleOrder/:productId',isLoggedIn,async(req,res)=>{
    
    try{
        const product= await Product.findById(req.params.productId)
        let user = req.user;

        let orderItem = new Order({
            user:user.username,
            img:product.img,
            productName:product.name,
            desc:product.desc,
        })

        await orderItem.save();
        await user.save();
        
        let boughtProduct = user.boughtProduct;
    
        boughtProduct.unshift(orderItem);
        await user.save();
    
        res.render('products/conformOrder');
    }catch(err){
        req.flash('error','Cannot Edit this Product')
        res.redirect('/error')
    }


})

// To delete perticular product
router.delete('/products/:id',isLoggedIn,async(req,res)=>{

    try{
        await Product.findByIdAndDelete(req.params.id)
        req.flash('success','Product Deleted Successfully')
        res.redirect('/products')
    }catch(e){
        console.log(e.massage)
        req.flash('error','Cannot Delete this Product')
        res.redirect('/error')
    }
    
})

// Creting a new comment on a product

router.post('/products/:id/review',isLoggedIn,async(req,res)=>{
    
    try{
        // console.log(req.body)
        const product = await Product.findById(req.params.id);
        // console.log(product)

        // const review = new Review(req.body);
        // console.log(review)

        const review = new Review({
            user:req.user.username,
            ...req.body
        })

        product.reviews.push(review)
        // (stores object id into reviews array present in productSchema)

        req.flash('success','Comment Added Successfully')

        await review.save()
        await product.save()

        res.redirect(`/products/${req.params.id}`);
    }catch{
        console.log(e.massage)
        req.flash('error','Cannot Delete this Product')
        res.redirect('/error')
    }
    

})

// To delete comment on product

router.delete('/products/:productId/review/:reviewId',isLoggedIn,async(req,res)=>{

    try{
        const {productId,reviewId}=req.params;


        const product = await Product.findByIdAndUpdate(req.params.productId,{$pull:{reviews:reviewId}})
        const review = await Review.findByIdAndDelete(req.params.reviewId)

        review.save();
        product.save();

        req.flash('success','Comment Deleted Successfully')

        res.redirect(`/products/${req.params.productId}`)

    }catch(e){
        console.log(e.massage)
        req.flash('error','Unable to Delete Comment')
        res.redirect('/error')
    }

})

// to Edit Comment
router.patch('/editComment/:id/:reviewId',isLoggedIn,async(req,res)=>{

    await Product.findById(req.params.id).populate('reviews')
    await Review.findByIdAndUpdate(req.params.reviewId,req.body)
    

    res.redirect(`/products/${req.params.id}`)
})





router.get('/error',(req,res)=>{
    res.status(500).render('error')
})






module.exports = router;