const Courses = require('../models/courses')

exports.homepage = (req, res, next) => {
    Courses.find().then(course => {
        console.log(course)
        res.json(course);
    }).catch(err =>{
        res.json("No Courses Found")
    });
}