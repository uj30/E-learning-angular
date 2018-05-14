import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/signin/auth.service'; 
import { Router } from '@angular/router';
import { CookieService } from '../auth/cookie.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers:[ AuthenticationService ]
})
export class CoursesComponent implements OnInit {
  
  show:Boolean;
  course:{course_name:String,course_description:String,course_id:String}[]=[];
  topic=[];
  coursename:String;

  constructor(public _authService:AuthenticationService,private router: Router,private _cookieService:CookieService) {
    this.show=true;
   }

   back(){
     this.show=true;
   }
   
   showtopic(id){
       this.show=false;
       this._authService.total_avail_courses()
       .then((res)=>{
        for(let i=0;i<res.res1.length;i++){
          if(id==res.res1[i]._id)
             {
               this.coursename=res.res1[i].course_name;
               this.topic=[];
               for(let j=0;j<res.res1[i].content.length;j++)
                 this.topic.push(res.res1[i].content[j].topic);
             }
        }
       })
   }

  ngOnInit() {
    if(this._cookieService.get("isLogedIn")=="yes"){
      this.router.navigate(['dashboard']);
  }

  this._authService.total_avail_courses()
  .then((res)=>{
    for(let i=0;i<res.res1.length;i++){
    var info={
      course_name:res.res1[i].course_name,
      course_description:res.res1[i].course_description,
      course_id:res.res1[i]._id
    }
    this.course.push(info);
  }
  })
  }

}
