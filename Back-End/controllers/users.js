const fs = require('fs');
const path = require('path');
const Courses = require('../models/courses')
const PDFDocument=require('pdfkit');
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

exports.userPage =  (req, res, next) => {
    const userId = req.params.userId;
    
    users.findById({_id:userId}).populate('bookmarked').exec().then(course => {
        
        res.json({message:"Bookmarked Course",course:course});


 //---------------------------------------------------------------------------       
        // for(i in courseArray){
        //     //  console.log(courseArray[i] +"   "+ i);
        //     Courses.findById({_id:courseArray[i]}).then(course => {
        //         console.log("i am here " + i);
        //        courses.push(course);
        //     }).catch(err => {
        //         res.json(err);
        //     })
        // }
//----------------------------------------------------------------------        
    }).catch(err =>{res.status(400).json(err)})
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
    const interest=req.body.interest;  //taking array from front end consisting of interests of users
    console.log(userId);              
    console.log(interest);
    users.findOne({_id:userId})           //finding that user by his/her id and saving that array in the database
    .then(user=>{
    user.interest=interest;
    user.save();
    res.json("preferences stored");
        })
}

exports.preference=(req, res, next) => {
    const userId=req.body.userId;
    users.findOne({_id:userId})
    .then(user=>{                                //display preferences made earlier
    //    var category1=user.interest[0];          //display courses of category which were chosen by user as his/her preference
    //    var category2=user.interest[1];
    //    var category3=user.interest[2];    
        // console.log(category1);
        var coursesarray=[];                   //making an empty array
        var x=0;                
        user.interest.forEach(interest => {         //for every category user has chosen , finding courses of that category from his/her database
            console.log(interest)
            courses.find({category:interest})
            .then(result=>{
                x++;
                result.forEach(all=>{                  //adding all the data of courses array into a single array
                    coursesarray.push(all);

                })

                if(user.interest.length===x){
                    res.json({coursesarray:coursesarray})
                }
               
                // console.log({coursesarray:coursesarray});
            })
           
            
        });
    //   console.log(coursesarray);
        // coursesarray.push("abhishek srivastav");
        // coursesarray.push("himnashu");
       

        Courses.findOne({category:category1})
        .then(found=>{
            coursesarray.push(found);

        // courses.find({category:category1})
        // .then(found=>{
            // coursesarray=found;
            // coursesarray.push(found);

            // res.json(coursesarray);
            // coursesarray=[...coursesarray,found];
            // console.log(found);

           
        })
       

        Courses.findOne({category:category2})
        .then(found1=>{
            coursesarray.push(found1);

    //     courses.find({category:category2})
    //     .then(found1=>{
            
    //         coursesarray.push(found1);
    //         // console.log(found1);
    //         // coursesarray1=found1;

           
           
        })
        

        Courses.findOne({category:category3})
        .then(found2=>{
            coursesarray.push(found2);
            res.json(coursesarray);
        })

    //     courses.find({category:category3})
    //     .then(found2=>{
    //         coursesarray.push(found2);
    //         // console.log(found2);
    //         // coursesarray=[...coursesarray,found2];
    //         // coursesarray2=found2;
    //         res.json(coursesarray);

           
          
           
    //     })
    // //   var interest1=coursesarray.concat(coursesarray1);
    //     // console.log(interest1);
       
    //     // coursesarray.push(one);
    //     // coursesarray.push(two);
    //     // coursesarray.push(two);

     
})
}

exports.uploads = (req,res,next) => {

       const userId=req.body.userId;
       courses.find({creator:userId})    //finding user by his creator id which was generated when he uploaded
       .then(data=>{                     //some courses and  , displaying all the courses he uploaded
           console.log(data)
           console.log("dhruvji")
           res.json({data:data});

       })

   
}