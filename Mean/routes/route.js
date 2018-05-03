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

//Getting Mycourses
//cc
// router.get('/logins',function(req,res,next){
//         User.find(async function(err,users){
//             for(let i=0;i<users.length;i++){
//             const course1  = await User.findOne({_id:users[i]}).populate('courses');
//             console.log("Populate",course1);
//         res.json(course1);   
//     }     
//     })
// });
//cc

//Getting Total Information
router.get('/getCourses',function(req,res,next){
         Courses.find(function(err,courses){
         res.json(courses);
     })
 });

 //Inserting into database for user login
router.post('/signup',function(req,res,next){
    console.log("Hello",req.body);
    
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
             console.log(err);
             res.json({msg:'Fail'});
         }
         else{
            res.json({msg:'User add'});
         }
     })
});

//For adding couses into student/instructor account
router.post('/addcourses',function(req,res,next){
    //cc
    // const course  = await User.findOne({_id:req.body.userid}).populate('courses' );
    // console.log(course.courses[0].course_name);
  
    User.findByIdAndUpdate(req.body.userid,{ $addToSet: { courses: req.body.courses} }, function(err, result){
        if(err){
            console.log(err);
            res.json({msg:'Fail'});
        }
      else{
        res.json({msg:'User add'});
      }
    });
});

 //Inserting into database for total courses
router.post('/totalcourses',function(req,res,next){
    console.log("Hello Courses",req.body);
    
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