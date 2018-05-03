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
  name;
  type_of_user;
//cc
  available_courses = [];
  instructor_name = [];
  course_id=[];
//cc
  constructor(public _authService:AuthenticationService,private route: ActivatedRoute,private router: Router,private _cookieService:CookieService) { }
 
  logout(){
    this._cookieService.remove('isLogedIn',null,null);
    this._cookieService.remove('name',null,null);
    this._cookieService.remove('type_of_user',null,null);
    this._cookieService.remove('userid',null,null);
  //  this._cookieService.remove('courses',null,null);
    this.router.navigate(['/home'])
  }

  //cc
  onAddCourse(event:any)
  {
    var target = event.target || event.srcElement || event.currentTarget;
   var new_course_name = target.attributes.id;
// console.log("Course id",new_course_name.value);
var uid=this._cookieService.get("userid");
// console.log(uid);
 this._authService.registerCourse({userid:uid,courses:new_course_name.value})
   .then((res)=>{
     this._authService.getmycourses().then((res)=>{
      //  console.log("After click",res.res2);
       this.mycourses=res.res2;
     });
   })
   //cc
   .then((res)=>{
    this.available_courses=[];
    this.instructor_name=[];
    this.course_id=[];
    this._authService.total_avail_courses().then((res)=>
    {
      for(let i=0;i<res.res1.length;i++)
      {  let flag=0;
        for(let j=0;j<this.mycourses.length;j++){
        if(res.res1[i]._id==this.mycourses[j]){flag=1}}
        if(flag==0){
     this.available_courses.push(res.res1[i].course_name);
     this.instructor_name.push(res.res1[i].instructor_name);
     this.course_id.push(res.res1[i]._id);}
      }
    }); 
   })
   //cc;
  }
  
  ngOnInit() {
    //cc
  //   this._authService.total_avail_courses().then((res)=>
  // {
  //   for(let i=0;i<res.res1.length;i++)
  //   {    
  //  this.available_courses.push(res.res1[i].course_name);
  //  this.instructor_name.push(res.res1[i].instructor_name);
  //  this.course_id.push(res.res1[i]._id);
  //   }
  // }); 
  this._authService.getmycourses().then((res)=>{
    console.log("courses-",res.res2)
    this.mycourses=res.res2;   
  });
  this._authService.total_avail_courses().then((res)=>
  {
    for(let i=0;i<res.res1.length;i++)
    {  let flag=0;
      for(let j=0;j<this.mycourses.length;j++){
      if(res.res1[i]._id==this.mycourses[j]){flag=1}}
      if(flag==0){
   this.available_courses.push(res.res1[i].course_name);
   this.instructor_name.push(res.res1[i].instructor_name);
   this.course_id.push(res.res1[i]._id);}
    }
  }); 

    //cc

    // this._authService.getmycourses().then((res)=>{
    //   console.log("courses-",res.res2)
    //   this.mycourses=res.res2;    
    // });


    // this._authService.getUpdates();
   
    // if(this._cookieService.get("courses")==null)
    //       this.mycourses= this._cookieService.get("courses");
    // else
    //       this.mycourses = this._cookieService.get("courses").split(',')
//cc
this.name=this._cookieService.get("name");
this.type_of_user=this._cookieService.get("type_of_user");
console.log(this.type_of_user);
     this.route.params.subscribe(params => {
      this.name = params.name
   });
  }

}
