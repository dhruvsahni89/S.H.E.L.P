const express = require('express');

const router = express.Router();

router.get('/signup',(req, res, next) => {
    console.log('In the signup');
    res.status(200).send('In the sign up'); 
});

module.exports = router;