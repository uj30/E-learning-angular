import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/signin/auth.service'; 
import { Router } from '@angular/router';
import { CookieService } from '../auth/cookie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ AuthenticationService ]
})
export class HomeComponent implements OnInit {

  name;
  constructor(public _authService:AuthenticationService,private router: Router,private _cookieService:CookieService) { }

  ngOnInit() {
    if(this._cookieService.get("isLogedIn")=="yes"){
      this.name=this._cookieService.get("name");
      this.router.navigate(['dashboard',this.name]);
  }
  }
  
}
