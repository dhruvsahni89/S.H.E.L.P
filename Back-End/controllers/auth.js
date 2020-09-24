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
      const token1 = jwt.sign(
        {
          email: email,
        },
        "otptoken",
        { expiresIn: 600 } //600s = 10min
      );

      const otpdata = new OtpUser({
        token: token1,
        Otp: otp,
        email: email,
      });

      otpdata.save();

      res.status(201).json({ message: "otp stored in database " , token:token1});
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

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("sorry user not found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((equal) => {
      if (!equal) {
        const error = new Error("wrong password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        { email: loadedUser.email, userId: loadedUser._id.toString() },
        "supersecret",
        { expiresIn: "2h" }
      );
      res
        .status(200)
        .json({
          token: token,
          userId: loadedUser._id.toString(),
          message: "User logged in",
        });
    });
};

exports.otpVerification = (req, res, next) => {
  const recievedToken = req.body.token;
  const recievedOtp = req.body.otp;
  // searching for otp in database by token that i stored by token1
  OtpUser.findOne({ token: recievedToken })
    .then((data) => {
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
      if (data.otp == recievedOtp) {
        User.findOne({ email: data.email }).then((user) => {
          user.isverified = "true";
          user.save();
        });

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
