const Courses = require('../models/courses')

exports.homepage = (req, res, next) => {

    const category = req.params.category;

    if(category === "all"){

        Courses.find().then(course => {
            console.log(course)
            res.json({message:"Course Found",course:course});
        }).catch(err =>{
            res.json("No Courses Found")
        });

    }
    else{
        Courses.find({category: category}).then(course => {
            console.log(course)
            res.json({message:"Course Found",course:course});
        }).catch(err =>{
            res.json("No Courses Found")
        });

    }
    
}