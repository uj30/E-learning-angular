import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Options } from 'selenium-webdriver/ie';
import { CookieService } from '../cookie.service';

@Injectable()
export class AuthenticationService {

private isUserLoggedIn;

constructor(private http:Http,private _cookieService:CookieService) 
{
// this.isUserLoggedIn=false;
this.isUserLoggedIn=JSON.parse(localStorage.getItem('loggedIn') || 'false');
//change
 }

   setUserLoggedIn()
   {
  
    //  let a=this._cookieService.get("isLogedIn");
    //  console.log(a);
    //  this.isUserLoggedIn=a?true:false;
    //  console.log(this.isUserLoggedIn);

    this.isUserLoggedIn=true
    localStorage.setItem('loggedIn','true')
    //change
   }

   getUserLoggedIn(){
    //  return this.isUserLoggedIn;

    return JSON.parse(localStorage.getItem('loggedIn') || this.getUserLoggedIn.toString())
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
           console.log(name);
            return {name:name};
          }
         }
        if(status==0)
         {
            alert("Your credentials is wrong");
            return {name:"Wrong"};
         }
        
    });
  }
}
