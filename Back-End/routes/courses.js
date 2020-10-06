const express = require('express');
const { body } =  require('express-validator/check'); // for validation of data
const isAuth=require('../middleware/is-auth');
const courseController = require('../controllers/courses')
const router = express.Router();

router.put('/Rating',courseController.rating) // For Rating Count 

router.get('/:courseId',isAuth,courseController.videoUrl) //For Video playing
router.put('/home/update',courseController.update) //for updating courses
router.put('/home/edit',courseController.edit)  // for editing , showing old data
router.delete('/home/delete',courseController.deletePost) // for deleting post
module.exports = router;