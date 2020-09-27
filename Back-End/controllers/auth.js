
const { validationResult, Result } = require("express-validator/check");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const OtpUser = require("../models/otp");
const nodemailer = require("nodemailer");
const sendgridTRansport = require("nodemailer-sendgrid-transport");
const config = require("../config");
const transporter = nodemailer.createTransport(
  sendgridTRansport({
    auth: {
      api_key: config.api_key,
    },
  })
);

exports.signup = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  bcrypt.hash(password, 12).then((hashedPass) => {
    console.log("password hashed");
    const user = new User({
        isverified: "false",
        email: email,
        name: name,
        password: hashedPass,
      });


      user.save();
      let otp = Math.floor(100000 + Math.random() * 900000);
      const token = jwt.sign(
        {
          email: email,
        },
        "otptoken",
        { expiresIn: 600 } //600s = 10min
      );


      const otpdata = new OtpUser({
        token: token,
        Otp: otp,
        email: email,
      });

      otpdata.save();

      res.status(201).json({ message: "otp stored in database " , token:token});
      return transporter.sendMail({
        to: email,
        from: "dhruvsahni.akg@gmail.com",
        subject: "signup successful",
        html: `<h1>thankuh for registering here is your one time pass : ${otp}</h1>`,
      });

    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};



exports.login=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
   

    User.findOne({email:email}) //checking email exist or not 
    .then( user=>{
      
        if(!user){
            const error =new Error('sorry user not found');
            error.statusCode = 401; // For not authenticated
            throw error;
        }
       const isverified=user.isverified;
       console.log(isverified + "dhruvsahni");
       if(isverified ==="false"){
      
        let otp = Math.floor(100000 + Math.random() * 900000);
        
        OtpUser.findOne({ email: email })
        .then((data) =>{
           data.Otp=otp;
           data.save();
        });
         transporter.sendMail({
          to: email,
          from: "dhruvsahni.akg@gmail.com",
          subject: "signup successful",
          html: `<h1>sorry uh have not registered please enter otp before login your one time pass : ${otp}</h1>`,
        });
        res.status(422).json({
          message: " you have not verified your otp  , new otp has been sent to your email   THANK YOU!"
        });
       
       }
      
      
       bcrypt.compare(password, user.password) // to compare the stored and entered password, returning because this will give us a promise

  
    .then(equal=>{  //will get a true or false
        if(!equal){
            const error = new Error('wrong password');
            error.statusCode=401;
            throw error;
        }
       
        
        const token=jwt.sign({email:user.email , //sign creates new signature and packs it in a new json web token
             userId:user._id.toString()}, // to string because its a mongodb object id here
             'supersecret', // passing second argument i.e our private key
             {expiresIn:'6h'}
             );
        
             res.status(200).json({token:token , userId:user._id.toString() , message:'User logged in'})
        })
      })
    }


exports.otpVerification = (req, res, next) => {
  const recievedToken = req.body.token;
  const recievedOtp = req.body.Otp;

  console.log()
 
  // searching for otp in database by token that i stored by token1
  OtpUser.findOne({ token: recievedToken })
    .then((data) => {
      console.log("found token");
      // if not found
      if (!data) {
        const error = new Error("Validation failed"); // when token not found
        error.statusCode = 403;
        error.data = {
          value: recievedOtp,
          msg: "invalid token",
          param: "otp",
          location: "otp",
        };
        throw error;
      }

      // check if entered otp is valid
      if (data.Otp === recievedOtp) {

        User.findOne({ email: data.email }).then(user => {
          user.isverified = "true";
          console.log(user);
          user.save();
        })
        const token = jwt.sign(
          {
            email: email,userId:user._id.toString()
          },
          "otpverifiedtoken",
          { expiresIn:'6h' } //600s = 10min
        );
        // const email = req.body.email;
        // const name = req.body.name;
        // const password = req.body.password;
        // const user = new User({
          
        //   email: email,
        //   name: name,
        //   password:password
        // });
       
          
        // });
        // console.log(data.otp);

        data.remove();

        return res.status(200).json({
          message: "otp entered is correct, user added",
        });
      } else {

        const error = new Error("Validation Failed");
        error.statusCode = 401;
        error.data = {
          value: recievedOtp,
          msg: "Otp incorrect",
          param: "otp",
          location: "otp",
        };
        throw error;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.resendOTP = (req, res, next) =>{ // extra measure's taken if, password valnerability occurs.........

  const token = req.body.token;
  const email = req.body.email;
  
      let otp = Math.floor(100000 + Math.random() * 900000);

      OtpUser.findOne({ email: email })
      .then((data) =>{
        data.Otp = otp ;
        data.save();

      res.status(201).json({ message: "otp stored in database " , token:token});

      return transporter.sendMail({
        to: email,
        from: "dhruvsahni.akg@gmail.com",
        subject: "Otp resend",
        html: `<h1>Your New OTP is : ${otp}</h1>`,
      });


    }).catch(err => {
      res.json("error while resending otp");
    })

  
  
}