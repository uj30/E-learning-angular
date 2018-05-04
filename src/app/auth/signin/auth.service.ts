import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Options } from 'selenium-webdriver/ie';
import { CookieService } from '../cookie.service';

@Injectable()
export class AuthenticationService {

userid:string;
private isUserLoggedIn;

constructor(private http:Http,private _cookieService:CookieService) 
{
  this.isUserLoggedIn=this._cookieService.hasItem('isLogedIn') || false;
 }
 
 //Getting User Courses
      getmycourses(){
        var res2=[];
        var res3=[];
        var res4=[];
        return this.http.get('http://localhost:3000/api/logins')
      .toPromise()
      .then((res)=>{ 
        var res1=res.json();
        var id=this._cookieService.get("userid");
        for(let i=0;i<res1.length;i++){
        if(id==res1[i]._id)
        {
          for(let j=0;j<res1[i].courses.length;j++){
          res2.push(res1[i].courses[j].course_name);
          res3.push(res1[i].courses[j]._id);
          res4.push(res1[i].courses[j].instructor_name);
      }}}
      return {res2,res3,res4};
      })
       }
  
   // Getting Total Available Courses
    total_avail_courses(){
      return this.http.get('http://localhost:3000/api/getcourses')
      .toPromise()
      .then((res)=>{ 
        var res1=res.json();
        return {res1};
      })
    }

//To Register Course
   registerCourse(user){
    return this.http.post('http://localhost:3000/api/addcourses',user).toPromise()
     .then((res)=>{return res})
   }
   
   //Setting User LoggedIn
   setUserLoggedIn()
   {
     let a=this._cookieService.get("isLogedIn");
     this.isUserLoggedIn=a?true:false;
   }

   //Checking User LoggedIn 
   getUserLoggedIn(){
     return this.isUserLoggedIn;
   }
  
   //For Login
  getlogin(data){
    var status=0;
    return this.http.get('http://localhost:3000/api/login')
    .toPromise()
    .then((res)=>{
        var res1 = res.json();
        const len = res1.length;
         for( let i = 0; i<len; i++){
          if(res1[i].email==data.user && res1[i].password==data.pwd) 
          {
           status=1;
           const name = res1[i].name;
           const type_of_user=res1[i].type_of_user;
           this.userid=res1[i]._id;
            return {name:name,type_of_user:type_of_user,userid:this.userid};
          }
         }
        if(status==0)
         {
            alert("Your credentials is wrong");
            return {name:"Wrong",type_of_user:"NULL",userid:"NULL"};
         }
        
    });
  }
}
