import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth.service'; 
import { Router } from '@angular/router';
import { AuthguardGuard } from '../../authguard.guard';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
  // providers: [AuthenticationService,AuthguardGuard]
})
export class SigninComponent implements OnInit {
  user : String;
  pwd: String;  
  name: String;
  constructor(public _authService:AuthenticationService,private router: Router,private _cookieService:CookieService) {  
  }

getLogin()
{
  this._authService.getlogin({user:this.user, pwd:this.pwd}).
  then((res) => {
     this.name = res.name;
    if(this.name=="Wrong")
    {}
    else{
      //change
      // this._cookieService.set("isLogedIn","yes",null,null,null,null);
      this._authService.setUserLoggedIn();
      //change
    this.router.navigate(['/dashboard', this.name])
  }
  });
 
}
  ngOnInit() {
  }

}

