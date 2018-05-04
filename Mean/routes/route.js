const express=require('express');
const router=express.Router();

const User=require('../models/users');
const Courses=require('../models/totalcourses');

//Getting Login Information
router.get('/login',function(req,res,next){
        User.find(function(err,users){
        res.json(users);        
    })
});

//Getting Mycourses Of User
router.get('/logins',function(req,res,next){
        User.find(async function(err,users){
            var course1=[];
            for(let i=0;i<users.length;i++){
             course1.push(await User.findOne({_id:users[i]}).populate('courses'));  
    }
    res.json(course1);     
    })
});

//Getting Total Information Of Total Available Courses
router.get('/getCourses',function(req,res,next){
         Courses.find(function(err,courses){
         res.json(courses);
     })
 });

 //Inserting into database for User Login
router.post('/signup',function(req,res,next){
     let newUser =new User({
         name:req.body.name,
         email:req.body.email,
         password:req.body.password,
         type_of_user:req.body.type_of_user,
         courses:req.body.courses
     });
     newUser.save(function(err,user){
         if(err)
         {
             res.json({msg:'Fail'});
         }
         else{
            res.json({msg:'User add'});
         }
     })
});

//For adding couses into student/instructor account
router.post('/addcourses',function(req,res,next){
    User.findByIdAndUpdate(req.body.userid,{ $addToSet: { courses: req.body.courses} }, function(err, result){
        if(err){
            res.json({msg:'Fail'});
        }
      else{
        res.json({msg:'User add'});
      }
    });
});

 //Inserting into database for total courses
router.post('/totalcourses',function(req,res,next){
       let newUser =new Courses({
        course_name:req.body.course_name,
        instructor_name:req.body.instructor_name,
        content:req.body.content
     });
     newUser.save(function(err,user){
         if(err)
         {
             res.json({msg:'Fail'});
         }
         else{
            res.json({msg:'User add'});
         }
     })
});

module.exports=router;