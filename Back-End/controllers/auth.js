const { validationResult, Result } = require('express-validator/check');

const bcrypt = require('bcryptjs');
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
        res.statusCode(201).json({message:'User Created'});
    })
    .catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err); 
    })  
};