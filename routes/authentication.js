const express = require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport')


// router.get('/fakeUser',async(req,res)=>{

//     const user = new User({email:'prashil@gmail.com',username:'Prashil13'})
//     const newUser =await User.register(user,'prashil123');

//     res.send(newUser)
// })


// To get the signUp form

router.get('/register',async (req,res)=>{
    res.render('authentication/signUp')
})

router.post('/register',async(req,res)=>{

    try{
        const user = new User({username:req.body.username,email:req.body.email})
        const newUser = await User.register(user,req.body.password)
        // console.log(newUser);
    
        req.flash('success','Registered Successfully')
        res.redirect('/login');
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/login')
    }

})

// To get login form

router.get('/login',async(req,res)=>{
    res.render('authentication/login')
})

router.post('/login',
    passport.authenticate('local', 
        { 
            // successRedirect: '/products',
            failureRedirect: '/login',
            failureFlash: true
        }
    ),(req,res)=>{
        
        req.flash('success',`Welcome Back ${req.user.username} !!!`)
        // console.log(req.user)

        res.redirect('/products')
    }
);

// To logout 

router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success','Logged Out Successfully')
    res.redirect('/login')
})




module.exports=router;

