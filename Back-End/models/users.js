var mongoose = require('mongoose');
const courses = require('./courses');

const Schema = mongoose.Schema; //to create a new schema i.e db field 


const UserSchema = new Schema({
    isverified:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true
    },


    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    courses:[
        {
            type:Schema.Types.ObjectId,
            ref:courses,
            require:false
        }
    ]

});


module.exports = User = mongoose.model('Users',UserSchema); //stored in users collection  and uses user schema

