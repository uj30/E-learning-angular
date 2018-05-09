import { Component, OnInit,NgModule,Pipe } from '@angular/core';
import { AuthenticationService } from '../signin/auth.service'; 
import { Router } from '@angular/router';
import { CookieService } from '../../auth/cookie.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthenticationService]
})
export class SignupComponent implements OnInit {
  registerUserData={
    username:'',
    email:'',
    password:''
  };
  type_of_user;
  name1;
  type_of_user1;
  userid;
  constructor(public _authService:AuthenticationService,private router: Router,private _cookieService:CookieService) {
   }

   registerUser()
   {
    this._authService.getregister({name:this.registerUserData.username,email:this.registerUserData.email, password:this.registerUserData.password,type_of_user:this.type_of_user}).
  then((res)=>{
   var res1 = res.json();

    if(res1.msg=="Fail")
    { alert("This Email Is Already Registered");
    }
    else{ alert("You are successful registered");
    this._authService.getlogin({user:this.registerUserData.email, pwd:this.registerUserData.password}).
    then((res) => {
       this.name1 = res.name;
       this.type_of_user1=res.type_of_user;
       this.userid=res.userid;
       this._cookieService.set("name",this.name1,null,null,null,null);
       this._cookieService.set("type_of_user",this.type_of_user1,null,null,null,null);
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
  });
  }

  ngOnInit() { 
    if(this._cookieService.get("isLogedIn")=="yes"){
          this.router.navigate(['dashboard']);
  }
  }

}

