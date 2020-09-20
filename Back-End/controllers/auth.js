const { validationResult, Result } = require('express-validator/check');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

  

exports.signup = (req, res, next) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;   
    }
    const email = req.body.email;
    const name  = req.body.name;
    const password = req.body.password;
    bcrypt.hash(password,12)
    .then(hashedPass => {
        const user = new User({
            email: email,
            name: name,
            password: hashedPass
        });
        return user.save();
    })
    .then(result => {
        res.status(201).json({message:'User Created'});
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

    User.findOne({email:email})
    .then( user=>{
        if(!user){
            const error =new Error('sorry user not found');
            error.statusCode = 401;
            throw error;
        }
        loadedUser=User;
        return bcrypt.compare(password, User.password);

    })
    .then(equal=>{
        if(!equal){
            const error=new Error('wrong password');
            error.statusCode=401;
            throw error;
        }
        const token=jwt.sign({email:loadedUser.email ,
             userId:loadedUser._id.toString()},
             'supersecret' ,
             {expiresIn:'2h'}
             );
             res.status(200).json({token:token , userId:loadedUser._id.toString()})

    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);


    });

};