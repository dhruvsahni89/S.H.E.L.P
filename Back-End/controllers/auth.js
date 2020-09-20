const bcrypt = require('bcryptjs');  //for encrypting password
const jwt = require('jsonwebtoken'); //for creating web token 
const User = require('../models/users'); // importing user schema 
const nodemailer=require('nodemailer');
const sendgridTRansport = require('nodemailer-sendgrid-transport'); // for integrating sendgrid with nodemailer

const { validationResult} = require('express-validator/check'); //For checking the result of validator

const transporter = nodemailer.createTransport(sendgridTRansport({ // tells how the mails should be transported
auth :{
    api_key:'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' 
}
}));

  

exports.signup = (req, res, next) =>{  
    const error = validationResult(req);
    if(!error.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        throw error;   
    }
    // extracting email,name and password form the body 
    const email = req.body.email;  
    const name  = req.body.name;
    const password = req.body.password;
    bcrypt.hash(password,12)  // 12 is strength 
    .then(hashedPass => {
        const user = new User({
            email: email,
            name: name,
            password: hashedPass
        });
        return user.save(); // return so that we can add a new then and check whether the save was successful or not
    })
    .then(result => {
        let otp =  Math.random() * 900000;
        res.status(201).json({message:'User Created'});
        return transporter.sendMail({
            to:email,
            from:'dhruvsahni89@gmail.com',
            subject:'signup successful',
            html:`<h1>thankuh for registering here is your one time pass </h1> <h1>:${otp}</h1>`
        });
    })
    .catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err); 
    })  
};

exports.login=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    let loadedUser;

    User.findOne({email:email}) //checking email exist or not 
    .then( user=>{
        if(!user){
            const error =new Error('sorry user not found');
            error.statusCode = 401; // For not authenticated
            throw error;
        }
        loadedUser=user;
        return bcrypt.compare(password, user.password); // to compare the stored and entered password, returning because this will give us a promise

    })
    .then(equal=>{  //will get a true or false
        if(!equal){
            const error = new Error('wrong password');
            error.statusCode=401;
            throw error;
        }
        const token=jwt.sign({email:loadedUser.email , //sign creates new signature and packs it in a new json web token
             userId:loadedUser._id.toString()}, // to string because its a mongodb object id here
             'supersecret', // passing second argument i.e our private key
             {expiresIn:'2h'}
             );
             res.status(200).json({token:token , userId:loadedUser._id.toString() , message:'User logged in'})

    })
    
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);


    });

};