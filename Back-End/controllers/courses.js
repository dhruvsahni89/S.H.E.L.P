const {validationResult} = require('express-validator/check');
const courses = require('../models/courses');
//const users = require('../models/users');

exports.createcourse = (req, res, next) => {
    console.log("hello");
    console.log(req.file);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message:'Validation Failed',errors: errors.array()});
    }

   // if(!req.file.isEmpty()){
   //     const error = new Error('no image Provided');
   //     error.statusCode = 422;
  //      throw error;
  //  }
    const title = req.body.title;
    //const imageUrl = req.file;
    const name = req.body.name;
    const discription = req.body.discription;
    //console.log(imageUrl);
    const course = new courses({
        title: title,
       name: name,
      discription: discription,
        //imageurl: imageUrl
    })
    course.save().then(result =>{
        console.log(result);
        res.status(201).json({message:'Course Created',post: result})
    }).catch(err => {
        console.log(err);
    });
};


