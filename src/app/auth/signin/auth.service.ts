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
 
 //cc

//  getUpdates(){
//   return this.http.get('http://localhost:3000/api/login')
//   .toPromise()
//   .then((res)=>{
//     var res1 = res.json();
//     const len = res1.length;
//     var id2 = this._cookieService.get("userid");
//     console.log(id2);
//     for(let i = 0; i<len; i++)
//     {
//       if(res1[i]._id==id2)
//       {
//         var courses = res1[i].courses;
//         console.log(courses);
//         this._cookieService.set("courses",courses,null,null,null,null);
//       }
//     }
//   });
//  }

       getmycourses(){
        return this.http.get('http://localhost:3000/api/login')
      .toPromise()
      .then((res)=>{ 
        var res1=res.json();
        var id=this._cookieService.get("userid");
        for(let i=0;i<res1.length;i++){
        if(id==res1[i]._id)
        {
          var res2=res1[i].courses;
          console.log("res2",res2);
        return {res2};
      }}
      })
       }
  
   //cc
    total_avail_courses(){
      return this.http.get('http://localhost:3000/api/getcourses')
      .toPromise()
      .then((res)=>{ 
        var res1=res.json();
        return {res1};
      })
    }

//cc
   registerCourse(user){
     console.log("hello",user.courses);
    return this.http.post('http://localhost:3000/api/addcourses',user).toPromise()
     .then((res)=>{return res})
   }
   //cc

   setUserLoggedIn()
   {
     let a=this._cookieService.get("isLogedIn");
     console.log(a);
     this.isUserLoggedIn=a?true:false;
     console.log(this.isUserLoggedIn);
   }

   getUserLoggedIn(){
     return this.isUserLoggedIn;
   }
  
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
           //const courses=res1[i].courses;
           this.userid=res1[i]._id;
           console.log(name);
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
