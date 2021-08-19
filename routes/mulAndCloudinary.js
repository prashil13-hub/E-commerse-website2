const express = require('express');
const router = express.Router();
const upload = require('../multer')
const cloudinary =require('../cloudinary');
const User = require('../models/user');
const fs =require('fs')



router.get('/upload/:userId',async(req,res)=>{
    const user = await User.findById(req.params.userId).populate('cart BoughtProducts')
    res.render('dashboard/upload',{userCart:user.cart , userOrders:user.BoughtProducts})
})


// Adding Profile Photo
router.post('/upload/image/:id',upload.single('image'),async(req,res)=>{

    const uploader = async(path)=> await cloudinary.uploads(path,'Images')

    const file = req.file

    const {path} = file;
    
    const newPath = await uploader(path)

    // console.log(newPath)
    const url = newPath.url;
    // console.log(url)

    fs.unlinkSync(path)

    const user = req.user;
    user.profilePhoto = url;
    await user.save();

    res.redirect(`/upload/${req.params.id}`)

})

// Removing Profile Photo
router.get('/removeImg/:id',async(req,res)=>{

    const user = req.user;
    user.profilePhoto=undefined;
    await user.save();

    res.redirect(`/upload/${req.params.id}`)

})


// Adding Cover Photo
router.post('/upload/coverImg/:id',upload.single('image'),async(req,res)=>{

    const uploader = async(path)=> await cloudinary.uploads(path,'coverImages')

    const file = req.file

    const {path} = file;
    
    const newPath = await uploader(path)

    // console.log(newPath)
    const url = newPath.url;
    // console.log(url)

    fs.unlinkSync(path)

    const user = req.user;
    user.coverPhoto = url;
    await user.save();

    res.redirect(`/upload/${req.params.id}`)

})

// Removing Cover Photo
router.get('/removeCoverPhoto/:id',async(req,res)=>{

    const user = req.user;
    user.coverPhoto=undefined;
    await user.save();

    res.redirect(`/upload/${req.params.id}`)

})

// Removing ordered item

router.delete('/user/:userid/order/:id', async(req, res) => {

    const { userid, id } = req.params;

    await User.findByIdAndUpdate(userid,{$pull:{BoughtProducts:id}})

    res.redirect(`/upload/${req.params.userid}`)
    
})







module.exports = router;