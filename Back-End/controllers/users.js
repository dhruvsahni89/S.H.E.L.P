const fs = require('fs');
const path = require('path');
const Courses = require('../models/courses')
const PDFDocument=require('pdfkit');
const courses = require('../models/courses');
const users = require('../models/users');


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



//----------------------------------------------------------------------------------------------------------------------------

exports.getinvoice =(req,res,next) =>{
    const userId=req.params.userId;
    courses.findOne({_id:userId})
    .then(user=>{
        if(!user){
            res.json('no such course id');
        }

    //   console.log("hello ji");
    const invoiceName = 'invoice-' + userId + '.pdf';
    const invoicePath = path.join('data', 'invoices', invoiceName);
    const pdfdoc=new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'inline; filename="' + invoiceName + '"'
      );
    pdfdoc.pipe(fs.createWriteStream(invoicePath));
    pdfdoc.pipe(res);
    pdfdoc.text('HERE IS SOME DESCRIPTION AND TIPS ABOUT THE COURSE ! THANKYOU ');
    pdfdoc.text(user.discription);
    pdfdoc.text('--------------------------------------------');
    pdfdoc.text('tips');
    pdfdoc.text('--------------------------------------------');
    pdfdoc.text('1. Treat an online course like a “real” course.');
    pdfdoc.text('--------------------------------------------');
    pdfdoc.text('2. Hold yourself accountable');
    pdfdoc.text('--------------------------------------------');
    pdfdoc.text(' Practice time management.');
    pdfdoc.text('--------------------------------------------');
    pdfdoc.text('4. Create a regular study space and stay organized.');
    pdfdoc.text('--------------------------------------------');
    pdfdoc.text('5. Eliminate distractions.');
    pdfdoc.end();
})
.catch(err =>{
    console.log(err);
    next(err)});
}


exports.suggestion=(req,res,next)=>{
    const userId=req.body.userId;
    const interest=req.body.interest;
    console.log(userId);
    console.log(interest);
    users.findOne({_id:userId})
    .then(user=>{
    user.interest=interest;
    user.save();
    res.json("preferences stored");
        })
}

exports.preference=(req,res,next)=>{
    const userId=req.body.userId;
    users.findOne({_id:userId})
    .then(user=>{
        const category1=user.interest[0];
        const category3=user.interest[2];
        const category2=user.interest[1];
        console.log(category1);
        const coursesarray=[];
        // coursesarray.push("abhishek srivastav");
        // coursesarray.push("himnashu");
       
        courses.findOne({category:category1})
        .then(found=>{
            coursesarray.push(found);
            // res.json(coursesarray);
            
            console.log(found);
           
        })
       
        courses.findOne({category:category2})
        .then(found1=>{
            coursesarray.push(found1);
           
           
        })
        
        courses.findOne({category:category3})
        .then(found2=>{
            coursesarray.push(found2);
            res.json(coursesarray);
          
           
        })
        console.log(coursesarray);
        // coursesarray.push(one);
        // coursesarray.push(two);
        // coursesarray.push(two);
        // res.json(coursesarray);
    })
           
}
