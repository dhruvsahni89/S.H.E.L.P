const {validationResult} = require('express-validator/check');
const courses = require('../models/courses');
const Users = require('../models/users');

exports.createcourse = (req, res, next) => {
    console.log("hello");
    console.log(req.file);
    console.log(req.file.path)
  //  const errors = validationResult(req);
  //  if(!errors.isEmpty()){
   //     return res.status(422).json({message:'Validation Failed',errors: errors.array()});
  //  }

//    if(!req.file.isEmpty()){
//        const error = new Error('no image Provided');
//        error.statusCode = 422;
//        throw error;
//    }
    const title = req.body.title;
    const imageUrl = req.file.path.split('/')[1];
    const name = req.body.name;
    const category = req.body.category;
    const discription = req.body.discription;
    console.log(imageUrl);
    const userID = req.body._id;

    const course = new courses({
        title: title,
        name: name,
        discription: discription,
        imageurl: imageUrl,
        creator: userID,
        category:category
    });

    course.save().then(result =>{
        console.log(result);
        res.status(201).json({message:'Course Created',post: result})
    }).catch(err => {
        console.log(err);
    });

}


exports.bookmarkCourse = (req, res, next) =>{

    const courseID = req.body._id;
    const email = req.body.email;
    Users.findOneAndUpdate({email:email},{
        $push:{courses:courseID}
    },{new:true}).then(data => {
        console.log(data);
        res.json(data);
    }).catch(err => {
        res.json("Not Updated");
    }) //1st argument is what to find 2nd is what are changes

}


exports.showCourse = (req, res, next) =>{
    const courseID = req.params.courseID;

    courses.findById({_id:courseID}).then(course => {
        res.json({message:"course Found",course:course}); // Returning the course to FrontEnd
    }).catch(err => {
        res.json("Course not found in DataBase");
    })
}


