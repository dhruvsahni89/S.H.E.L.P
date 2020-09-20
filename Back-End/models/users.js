var mongoose = require('mongoose');

const Schema = mongoose.Schema; //to create a new schema i.e db field 

const UserSchema = new Schema({ //type :- type of field require:- compulsory or not 
    email:{
        type: String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});
module.exports = User = mongoose.model('Users',UserSchema); //stored in users collection  and uses user schema