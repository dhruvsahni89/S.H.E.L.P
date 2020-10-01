const {validationResult} = require('express-validator/check');
const courses = require('../models/courses');
const Users = require('../models/users');

exports.createcourse = (req, res, next) => {
    console.log("hello");
    console.log(req.files);
    console.log(req.files[0].path)
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
    const imageUrl = req.files[0].filename;
    const videoUrl = req.files[1].filename;
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
        category:category,
        videourl:videoUrl
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
        $push:{ bookmarked:courseID}
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


exports.rating = (req,res,next) => {
    const rating  = req.body.rating;
    const courseId = req.body._id;

    console.log(courseId);
    console.log(rating);

    courses.findById({_id:courseId}).then(course =>{

        let newRating = (rating + course.rating)/2;
        course.rating = newRating.toPrecision(2);;
        
        course.save().then(result => {
            res.json({message:"course saved",result:result});
        }).catch(err=>{
            res.json(err);
        })
    }).catch(err => {
        console.log(courseId+" :- this is id");
        res.json("course not found!!!!!!!!!!!!");
    })
}

exports.videoUrl = (req,res,next) => {

    const courseId = req.params.courseId;

    courses.findById({_id:courseId}).then(course =>{
        const videourl = course.videourl;
        res.json({message:"video Found",videourl:videourl })
    }).catch(err => {
        res.json(err);
    })
}
