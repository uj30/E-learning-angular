import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../app/auth/signin/auth.service'; 
import { Router } from '@angular/router';
import { CookieService } from './auth/cookie.service';

@Injectable()
export class AuthguardcourseGuard implements CanActivate {
  constructor(public _authService:AuthenticationService,public _cookieService:CookieService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      var typeofuser = this._cookieService.get("type_of_user");
      var isLoggedIn= this._cookieService.get("isLogedIn");
      if(isLoggedIn=="yes"){
    if(typeofuser=='Student')
    {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
  else{
    this.router.navigate(['signin']);
    return false;
  }
  }
}
