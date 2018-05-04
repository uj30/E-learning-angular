import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth.service'; 
import { Router } from '@angular/router';
import { CookieService } from '../../auth/cookie.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthenticationService]
})
export class SignupComponent implements OnInit {
  user : String;
  pwd: String;  
  name1:String;
  type_of_user:String;
  show : Boolean;
  name;

  constructor(public _authService:AuthenticationService,private router: Router,private _cookieService:CookieService) {
    this.show=true;
   }

   //Function for Register User In Database
   
  getregister()
  {
  if(this.user==undefined || this.pwd==undefined || this.name1==undefined || this.type_of_user==undefined)
  {
    alert("Every field is mandatory");
  }
  else if(this.pwd.length<=5)
      {
        alert("Password length should be minimum 6 character");
      }
      else
      {
  this._authService.getregister({name:this.name1,email:this.user, password:this.pwd,type_of_user:this.type_of_user}).
  then((res)=>{
   var res1 = res.json();
    if(res1.msg=="Fail")
    { alert("Try Different Email");
    }
    else{ this.show=false;}
  });
     }
  }
  
  ngOnInit() {
    if(this._cookieService.get("isLogedIn")=="yes"){
      this.name=this._cookieService.get("name");
      this.router.navigate(['dashboard',this.name]);
  }
  }

}
