var mongoose=require('mongoose');
const validator=require('validator');

//Schema For Users Information
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator:validator.isEmail
        }
    },
    password:{
        type:String,
        required:true
    },
    type_of_user:{
        type:String
    },
    state:{
         type:String
    },
    country:{
        type:String
    },
    mobile:{
        type:String
   },
   dob:{
       type:String
   },
   education:{
       type:String
   },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Total Courses"
    }
    ]
});

const users=module.exports=mongoose.model('User',UserSchema);