import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Options } from 'selenium-webdriver/ie';

@Injectable()
export class AuthenticationService {

  // change
private isUserLoggedIn;
  //change

  constructor(private http:Http) {
//change
this.isUserLoggedIn=false;
//change
   }

   //change
   setUserLoggedIn()
   {
     this.isUserLoggedIn=true;
   }
   getUserLoggedIn(){
     return this.isUserLoggedIn;
   }
   //change

  //login
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
