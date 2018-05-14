var mongoose=require('mongoose');
const validator=require('validator');

//User Schema For Total Available Courses
const UserSchema=mongoose.Schema({
    course_name:{
        type:String,
        required:true
    },
    course_description:{
        type:String,
        require:true
    },
    instructor_name:{
        type:String,
        required:true
    },
  content:[
      {
          topic: String,
          url:String,
          description: String
      }
    ]
});

const User=module.exports=mongoose.model('Total Courses',UserSchema);