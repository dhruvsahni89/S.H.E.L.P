var mongoose = require('mongoose');

const Schema = mongoose.Schema; //to create a new schema i.e db field 

const courseSchema = new Schema({ 
    title:{
        type: String,
        require:true
    },
    category:{
        type:String,
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
    willLearn:{
        type: String,
        require:false
    },
    discription:{
        type: String,
        require:true
    },
    discriptionLong:{
        type: String,
        require:false
    },
    requirement:{
        type: String,
        require:false
    },
    creator:{
        type: Schema.Types.ObjectId, //for refrencing the person who created it 
        required:true,
        ref:'User'
    },
    videourl:[{
        type:String,
        required:true
    }],
    rating:{
        ratingSum:{
            type:Number,
            required:false,
            default:0
        },
        timesUpdated:{
            type:Number,
            require:false,
            default:0
        },
        ratingFinal:{
            type:Number,
            require:false,
            default:0
        }
    }
    },
    {timestamps: true}
);

module.exports = courses = mongoose.model('Courses',courseSchema); //stored in users collection  and uses user schema