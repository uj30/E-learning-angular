import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../app/auth/signin/auth.service'; 
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from '../auth/cookie.service';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css'],
  providers:[ CookieService]
})
export class AddcourseComponent implements OnInit {
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
  url:String;
  desc:String;
  content:{topic: String,url:String, description: String}[] = [];
  check:Boolean
  
  constructor(public _authService:AuthenticationService,private route: ActivatedRoute,private router: Router,private _cookieService:CookieService)
   {  
     this.check=true;
  }

//Function For Logout And Removing All Stored Cookies Of User
logout(){
  this._cookieService.remove('isLogedIn',null,null);
  this._cookieService.remove('name',null,null);
  this._cookieService.remove('type_of_user',null,null);
  this._cookieService.remove('userid',null,null);
  this._cookieService.remove("course_id",null,null);
  this.router.navigate(['/home'])
}

//Taking CourseName And Content Of Course Into Array Of Object And Empty The Field
onAdd(event:any)
{
  this.check=false;
  var info = {
    topic : this.topic,
    url : this.url,
    description: this.desc
  }
  this.content.push(info);
   this.topic="";
   this.url="";
  this.desc="";
}

//Adding Course To Total Available Course Database And MyCourses In User Account
onAddAvailableCourse(event:any)
{     
  var info = {
    topic : this.topic,
    url : this.url,
    description: this.desc
  }
  this.content.push(info);
   this.topic="";
   this.url="";
  this.desc="";
  
  var target = event.target || event.srcElement || event.currentTarget;
  console.log("course:",this.coursename);
  this._authService.addAvailableCourse({course_name:this.coursename,content:this.content,instructor_name:this.name}).
then((res)=>{
 var res1 = res.json();
  var cid;
  this._authService.total_avail_courses().then((res)=>{
  for(let i=0;i<res.res1.length;i++){
   if(res.res1[i].course_name==this.coursename && res.res1[i].instructor_name==this.name)
       cid=res.res1[i]._id;
  }
  }).then((res)=>{
  var uid=this._cookieService.get("userid");
this._authService.registerCourse({userid:uid,courses:cid}).then((res)=>{
  this.topic="";
  this.url="";
this.desc="";
this.coursename="";
this.check=true;
})
  })
})
}

  ngOnInit() {
  //Calling Dashboard With Name
this.name=this._cookieService.get("name");
this.type_of_user=this._cookieService.get("type_of_user");
  }
  }


