if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express')
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const seedDB = require('./seed')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/user');
const bodyParser = require('body-parser')
const fs =require('fs')
const cloudinary = require('cloudinary');
const multer = require('multer')



// Routes
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/authentication')
const cartRoutes = require('./routes/cart')
const multerRoutes = require('./routes/mulAndCloudinary')



mongoose.connect(process.env.DB_URL, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
    })
    .then(()=>{
        console.log("DB Connected")
    })
    .catch((err)=>{
        console.log("OHH No Error")
        console.log(err)
    })


// seedDB()



app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
app.use(express.static(path.join(__dirname,'/public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

const sessionConfig={
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionConfig))
app.use(flash())

// Initialising passport and session for storing the users info
app.use(passport.initialize())
app.use(passport.session())

// Configuring the passport to use Local Strategy
passport.use(new localStrategy(User.authenticate()))

// Generates a function that used for serialize and deserialize the user into the session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash
app.use((req,res,next)=>{
    res.locals.success=req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.currentUser=req.user;
    next();
})


app.use(productRoutes)
app.use(authRoutes)
app.use(cartRoutes)
app.use(multerRoutes)




app.get('/',(req,res)=>{
    res.render('home')
})






app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running at port 3000")
})

