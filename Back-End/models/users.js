var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
module.exports = User = mongoose.model('Users',UserSchema);