var mongoose=require('mongoose');
const validator=require('validator');

const UserSchema=mongoose.Schema({
    course_name:{
        type:String,
        required:true
    },
    instructor_name:{
        type:String,
        required:true
    },
  content:[
      {
          topic: String,
          description: String
      }
    ]
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    //   }
});

const User=module.exports=mongoose.model('Total Courses',UserSchema);