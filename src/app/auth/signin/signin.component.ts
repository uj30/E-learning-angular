import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { AuthenticationService } from './auth.service'; 
import { Router } from '@angular/router';
import { AuthguardGuard } from '../../authguard.guard';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  name;
  user : string;
  pwd: string;  
  name1: string;
  type_of_user:string;
  userid:string;
  show:Boolean
  show1:Boolean
  show2:Boolean

  registerUserData={
    password:'',
    email:''
  }
  id:string

  constructor(public _authService:AuthenticationService,private router: Router,private _cookieService:CookieService) {  
   this.show=true;
   this.show1=false;
   this.show2=false
  }
  
  //Function for Checking Credentials
getLogin()
{
  this._authService.getlogin({user:this.user, pwd:this.pwd}).
  then((res) => {
     this.name1 = res.name;
     this.type_of_user=res.type_of_user;
     this.userid=res.userid;
     this._cookieService.set("name",this.name1,null,null,null,null);
     this._cookieService.set("type_of_user",this.type_of_user,null,null,null,null);
     this._cookieService.set("userid",this.userid,null,null,null,null);
    if(this.name1=="Wrong")
    {}
    else{
      this._cookieService.set("isLogedIn","yes",null,null,null,null);
      this._authService.setUserLoggedIn();
    this.router.navigate(['/dashboard'])
  }
  });
 
}


forgotpassword()
{
  this.show=false
  this.show1=true
}

getpasswordchange(){
   this.show=false
   this._authService.checkemail(this.registerUserData.email).then((res)=>{ 
    if(res._id)
{  this.id=res._id
   this.show1=false
  this.show2=true
}
else{
  this.show1=true
  this.show2=false
}
   })
}

getLogin1(){
this._authService.resetpassword({password:this.registerUserData.password,id:this.id}).then((res)=>{
 alert("Your password has been successfully updated!")
this.show=true;
this.show1=false;
this.show2=false;
this.registerUserData={
  email:'',
  password:''
}
})
}

  ngOnInit() {
    if(this._cookieService.get("isLogedIn")=="yes"){
      this.router.navigate(['dashboard']);
  }
  }

}

