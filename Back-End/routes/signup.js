const express = require('express');
const { body } =  require('express-validator/check');
const User = require('../models/users');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup',[
    body('email')
        .isEmail()
        .withMessage('Please Enter a Valid Email')
        .custom((value, { req }) => {
            return User.findOne({email: value}).then(UserDoc => {
                if(UserDoc){
                    return Promise.reject('E-mail Adress already Exist');
                }
            })
        }).normalizeEmail(),
    body('password')
        .trim()
        .isLength({min:5}),
    body('name')
        .trim()
        .not()
        .isEmpty() 
],authController.signup
);

router.put('/login',authController.login);

module.exports = router;