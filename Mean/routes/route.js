const express=require('express');
const router=express.Router();

const User=require('../models/users');

router.get('/login',function(req,res,next){
   // console.log(req.body);
        User.find(function(err,users){
        res.json(users);
    })
});

router.post('/signup',function(req,res,next){
    console.log("Hello",req.body);
    
     let newUser =new User({
         name:req.body.name,
         email:req.body.user,
         password:req.body.pwd,
         type_of_user:req.body.type_of_user
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