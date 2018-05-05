import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/signin/auth.service'; 
import { Router } from '@angular/router';
import { CookieService } from '../auth/cookie.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers:[ AuthenticationService ]
})
export class CoursesComponent implements OnInit {
  name;
  show:Boolean;
  html:Boolean;
  angular:Boolean;
  node:Boolean;
  deep:Boolean;

  constructor(public _authService:AuthenticationService,private router: Router,private _cookieService:CookieService) {
    this.show=true;
    this.html=false;
    this.angular=false;
    this.node=false;
    this.deep=false;
   }
   
   //Button Click Function
   html_1()
   {
     this.show=false;
     this.html=true;
   }
   angular_1()
   {
     this.show=false;
     this.angular=true;
   }
   node_1()
   {
     this.show=false;
     this.node=true;
   }
   deep_1()
   {
     this.show=false;
     this.deep=true;
   }
   back_html_1()
   {
     this.show=true;
     this.html=false;
   }
   back_angular_1()
   {
     this.show=true;
     this.angular=false;
   }
   back_node_1()
   {
     this.show=true;
     this.node=false;
   }
   back_deep_1()
   {
     this.show=true;
     this.deep=false;
   }

  ngOnInit() {
    if(this._cookieService.get("isLogedIn")=="yes"){
      this.router.navigate(['dashboard']);
  }
  }

}
