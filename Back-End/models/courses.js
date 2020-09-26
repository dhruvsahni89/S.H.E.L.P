var mongoose = require('mongoose');

const Schema = mongoose.Schema; //to create a new schema i.e db field 

const courseSchema = new Schema({ 
    title:{
        type: String,
        require:true
    },
 //   imageurl:{
 //       type:String,
  //      require:false
//    },
    name:{
        type:String,
        require:true
    },
    discription:{
        type: String,
        require:true
    },
    rating:[
        { type:String, require:"give a rating"}
    ]
    },
    {timestamps: true}
);

module.exports = mongoose.model('Courses',courseSchema); //stored in users collection  and uses user schema