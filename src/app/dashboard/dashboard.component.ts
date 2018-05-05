import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../app/auth/signin/auth.service'; 
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from '../auth/cookie.service';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-dashboard', 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ CookieService]
})

export class DashboardComponent implements OnInit {

  mycourses;
  instructor;
  mycourseid;
  name;
  type_of_user;
  available_courses = [];
  instructor_name = [];
  course_id=[];
  
  coursename:String;
  topic:String;
  desc:String;
  content:{topic: String, description: String}[] = [];
  check:Boolean;
  
  constructor(public _authService:AuthenticationService,private route: ActivatedRoute,private router: Router,private _cookieService:CookieService)
   { this.check=true; 
  }
 
  //Function For Logout And Removing All Stored Cookies Of User
  logout(){
    this._cookieService.remove('isLogedIn',null,null);
    this._cookieService.remove('name',null,null);
    this._cookieService.remove('type_of_user',null,null);
    this._cookieService.remove('userid',null,null);
    this.router.navigate(['/home'])
  }

  //Taking CourseName And Content Of Course Into Array Of Object And Empty The Field
  onAdd(event:any)
  {
    this.check=false;
    var info = {
      topic : this.topic,
      description: this.desc
    }
    this.content.push(info);
     this.topic="";
    this.desc="";
  }

  //Adding Course To Total Available Course Database And MyCourses In User Account
  onAddAvailableCourse(event:any)
  {     
    var info = {
      topic : this.topic,
      description: this.desc
    }
    this.content.push(info);
     this.topic="";
    this.desc="";
    
    var target = event.target || event.srcElement || event.currentTarget;
    console.log("course:",this.coursename);
    this._authService.addAvailableCourse({course_name:this.coursename,content:this.content,instructor_name:this.name}).
  then((res)=>{
   var res1 = res.json();
    console.log(res1.msg);
    var cid;
    this._authService.total_avail_courses().then((res)=>{
    for(let i=0;i<res.res1.length;i++){
     if(res.res1[i].course_name==this.coursename && res.res1[i].instructor_name==this.name)
         cid=res.res1[i]._id;
    }
    }).then((res)=>{
    var uid=this._cookieService.get("userid");
  this._authService.registerCourse({userid:uid,courses:cid}).then((res)=>{this._authService.getmycourses().then((res)=>{
    this.mycourses=res.res2; 
    this.mycourseid=res.res3;      
    this.instructor=res.res4; });

    this.topic="";
  this.desc="";
  this.coursename="";
  this.check=true;
})
    })
  })
}
  
  //Function For Adding Course In User Account And Removing From Available Course And Display In User MyCourses
  onAddCourse(event:any)
  {
    var target = event.target || event.srcElement || event.currentTarget;
   var new_course_name = target.attributes.id;
var uid=this._cookieService.get("userid");
 this._authService.registerCourse({userid:uid,courses:new_course_name.value})
   .then((res)=>{
     this._authService.getmycourses().then((res)=>{
           this.mycourses=res.res2; 
           this.mycourseid=res.res3;      
           this.instructor=res.res4; 
     }) .then((res)=>{
      this.available_courses=[];
      this.instructor_name=[];
      this.course_id=[];
      this._authService.total_avail_courses().then((res)=>
      {
        for(let i=0;i<res.res1.length;i++)
        {  let flag=0;
          for(let j=0;j<this.mycourseid.length;j++){
          if(res.res1[i]._id==this.mycourseid[j]){flag=1}}
          if(flag==0){
       this.available_courses.push(res.res1[i].course_name);
       this.instructor_name.push(res.res1[i].instructor_name);
       this.course_id.push(res.res1[i]._id);}
        }
      })
     });
   })
  }
  
  ngOnInit() {
    //Calling Available and MyCourses Of User 
  this._authService.getmycourses().then((res)=>{
    this.mycourses=res.res2; 
    this.mycourseid=res.res3;
    this.instructor=res.res4;
  }).then((res)=>{
    this._authService.total_avail_courses().then((res)=>
    {
      for(let i=0;i<res.res1.length;i++)
      {  let flag=0;
        for(let j=0;j<this.mycourseid.length;j++){
        if(res.res1[i]._id==this.mycourseid[j]){flag=1}}
        if(flag==0){
     this.available_courses.push(res.res1[i].course_name);
     this.instructor_name.push(res.res1[i].instructor_name);
     this.course_id.push(res.res1[i]._id);}
      }
    })
  })

  //Calling Dashboard With Name
this.name=this._cookieService.get("name");
this.type_of_user=this._cookieService.get("type_of_user");
  }

}
