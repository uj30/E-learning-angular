import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth.service'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthenticationService]
})
export class SignupComponent implements OnInit {
  user : String;
  pwd: String;  
  name:String;
  type_of_user:String;
  show : Boolean;

  constructor(public _authService:AuthenticationService) {
    this.show=true;
   }
  getregister()
  {

  console.log(this.user);
  console.log(this.type_of_user);
  if(this.user==undefined || this.pwd==undefined || this.name==undefined || this.type_of_user==undefined)
  {
    alert("Every field is mandatory");
  }
  else if(this.pwd.length<=5)
      {
        alert("Password length should be minimum 6 character");
      }
      else
      {
  this._authService.getregister({name:this.name,user:this.user, pwd:this.pwd,type_of_user:this.type_of_user}).
  then((res)=>{
   var res1 = res.json();
    console.log(res1.msg);
    if(res1.msg=="Fail")
    { alert("Try Different Email");
    }
    else{ this.show=false;}
   
  });
 
}
    
  }
  ngOnInit() {
  }

}
