import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../app/auth/signin/auth.service'; 
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from '../auth/cookie.service';

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

  constructor(public _authService:AuthenticationService,private route: ActivatedRoute,private router: Router,private _cookieService:CookieService) { }
 
  //Function For Logout And Removing All Stored Cookies Of User
  logout(){
    this._cookieService.remove('isLogedIn',null,null);
    this._cookieService.remove('name',null,null);
    this._cookieService.remove('type_of_user',null,null);
    this._cookieService.remove('userid',null,null);
    this.router.navigate(['/home'])
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
     this.route.params.subscribe(params => {
      this.name = params.name
   });
  }

}
