const express = require('express');
const { body } =  require('express-validator/check'); // for validation of data
const UserController = require('../controllers/users');
const courseController = require('../controllers/courses')
const isAuth=require('../middleware/is-auth');
const router = express.Router();

router.get('/home/:category',UserController.homepage);

router.get('/course/:course/:courseID',courseController.showCourse);
router.get('/users/:userName/:userId',UserController.userPage);

router.post('/home/:category/:courseTitle',courseController.bookmarkCourse);

router.get('/home/download/:userId',UserController.getinvoice );
router.post('/home/interests',UserController.suggestion);
router.post('/home/preferences',isAuth,UserController.preference);
router.post('/teacher/uploads',UserController.uploads);


module.exports = router;