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
name:String
state:String
country:String
email:String
dob:String
mobile:String
education:String
userid:String
password:String

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
    this._authService.getupdateuserdata({_id:this.userid,dob:this.dob,name:this.name,email:this.email,password:this.password,mobile:this.mobile,education:this.education,state:this.state,country:this.country})
    .then((res)=>{     
      var res1=res.json();
     if(res1.msg=="Fail")
     alert("Please Enter Different Email Because This Email Is Already Registered");
     else{
      this.name=res1.name
      this.show=true;
     }
    }).then((res)=>{ 
      this._cookieService.set("name",this.name,null,null,null,null);
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
      this.name=res1.name
      this.email=res1.email
      this.mobile=res1.mobile
      this.education=res1.education
      this.state=res1.state
      this.country=res1.country
      this.dob=res1.dob
      this.password=res1.password
    });
  }

}
