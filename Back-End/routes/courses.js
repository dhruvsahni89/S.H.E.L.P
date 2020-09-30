const express = require('express');
const { body } =  require('express-validator/check'); // for validation of data
const isAuth=require('../middleware/is-auth');
const courseController = require('../controllers/courses')
const router = express.Router();

router.put('/Rating',courseController.rating)


module.exports = router;