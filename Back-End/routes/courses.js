const express = require('express');
const isAuth=require('../middleware/is-auth');
const courseController = require('../controllers/courses')
const router = express.Router();

router.put('/Rating',courseController.rating) // For Rating Count 

router.put('/home/courseUpdate',isAuth,courseController.update) //for updating courses
router.put('/home/edit',isAuth,courseController.edit)  // for editing , showing old data
router.post('/Course/delete',isAuth,courseController.deletePost) // for deleting post
module.exports = router;