const express = require('express');
const { body } =  require('express-validator/check'); // for validation of data
const UserController = require('../controllers/users');
const isAuth=require('../middleware/is-auth');
const router = express.Router();

router.post('/home',UserController.homepage);
module.exports = router;