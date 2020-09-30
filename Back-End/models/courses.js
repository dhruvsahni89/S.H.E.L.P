var mongoose = require('mongoose');

const Schema = mongoose.Schema; //to create a new schema i.e db field 

const courseSchema = new Schema({ 
    title:{
        type: String,
        require:true
    },
   imageurl:{
        type:String,
        require:true
   },
    name:{
        type:String,
        require:true
    },
    discription:{
        type: String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    creator:{
        type: Schema.Types.ObjectId,   //for refrencing the person who created it 
        required:true,
        ref:'User'
    },
    rating:
        { 
            type:Number, 
            require:false
        }
    },

    {timestamps: true}
);

module.exports = courses = mongoose.model('Courses',courseSchema); //stored in users collection  and uses user schema