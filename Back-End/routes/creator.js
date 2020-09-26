const express = require('express');
const { body } =  require('express-validator/check'); // for validation of data
const Courses = require('../models/courses');
const courseController = require('../controllers/courses');
const router = express.Router();


router.post('/create-course',[
    body('title').trim().isLength({min:5}),
    body('name').trim().isLength({min:5}) 
],courseController.createcourse);


module.exports = router;