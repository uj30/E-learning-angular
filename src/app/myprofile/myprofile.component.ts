import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../app/auth/signin/auth.service'; 
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from '../auth/cookie.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
  providers:[ CookieService]
})
export class MyprofileComponent implements OnInit {
show:Boolean
userid:String
type_of_user:String

registerUserData={
  name:'',
  email:'',
  password:'',
  state:'',
  country:'',
  mobile:'',
  dob:'',
  education:''
};


  constructor(public _authService:AuthenticationService,private route: ActivatedRoute,private router: Router,private _cookieService:CookieService) {
    this.show=true;
   }

   //Calling Edit Function For Changes In Database
  edit()
  { 
  this.show=false;
  }

  //Saving Changes In Database
  changes()
  {
    this._authService.getupdateuserdata({_id:this.userid,dob:this.registerUserData.dob,name:this.registerUserData.name,email:this.registerUserData.email,password:this.registerUserData.password,mobile:this.registerUserData.mobile,education:this.registerUserData.education,state:this.registerUserData.state,country:this.registerUserData.country})
    .then((res)=>{     
      var res1=res.json();
     if(res1.msg=="Fail")
     alert("Please Enter Different Email Because This Email Is Already Registered");
     else{
      this.show=true;
     }
    })
  }

  //Function For Logout And Removing All Stored Cookies Of User
  logout(){
    this._cookieService.remove('isLogedIn',null,null);
    this._cookieService.remove('name',null,null);
    this._cookieService.remove('type_of_user',null,null);
    this._cookieService.remove('userid',null,null);
    this._cookieService.remove("course_id",null,null);
    this.router.navigate(['/home'])
  }

  ngOnInit() {
    this.userid=this._cookieService.get("userid");
      
    //Showing Original Values
    this._authService.getuserinfo(this.userid).then((res)=>{
       var res1 = res.json();
      this.registerUserData.mobile=res1.mobile
      this.registerUserData.education=res1.education
      this.registerUserData.state=res1.state
      this.registerUserData.country=res1.country
      this.registerUserData.dob=res1.dob
      this.registerUserData.password=res1.password
      this.type_of_user=res1.type_of_user
      this.registerUserData.name=res1.name
      this.registerUserData.email=res1.email
    });
  }

}
