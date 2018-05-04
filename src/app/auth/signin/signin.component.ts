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
  constructor(public _authService:AuthenticationService,private router: Router,private _cookieService:CookieService) {  
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
    this.router.navigate(['/dashboard', this.name1])
  }
  });
 
}

  ngOnInit() {
    if(this._cookieService.get("isLogedIn")=="yes"){
      this.name=this._cookieService.get("name");
      this.router.navigate(['dashboard',this.name]);
  }
  }

}

