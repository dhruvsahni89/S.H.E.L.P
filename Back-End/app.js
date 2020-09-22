const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // importing mongoose

var User = require('./models/users'); //importing schema 
const signupRoute = require('./routes/signup'); //importing signup route
const errorController = require('./controllers/error')

const app = express();
const port =8080; //whatever is in the environment variable PORT or 3000

app.use(bodyParser.json()); // For parsing the incoming json file from the client

app.use((req, res, next) =>{  // To remove CROS (cross-resource-origin-platform) problem 
    res.setHeader('Allow-Control-Allow-Origin','*'); // to allow all client we use *
    res.setHeader('Allow-Control-Allow-Methods','OPTIONS,GET,POST,PUT,PATCH,DELETE'); //these are the allowed methods 
    res.setHeader('Access-Control-Allow-Headers', "*"); // allowed headers (Auth for extra data related to authoriaztiom)
    next();
})

app.use(signupRoute); //For signUp route


app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message:message});
}) 
app.use('/',errorController.error404);


mongoose.connect('mongodb+srv://Abhishek_Srivas:Pagalworld@cluster0.0sntl.mongodb.net/Database?retryWrites=true&w=majority')
.then(result =>{
    app.listen(port);
})
.catch(err =>{
    console.log(err);
})