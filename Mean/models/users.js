var mongoose=require('mongoose');
const validator=require('validator');

// var totalcourses=require('../models/totalcourses');

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
        type:String,
        required:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Total Courses"
    }
    ]
});

const users=module.exports=mongoose.model('User',UserSchema);