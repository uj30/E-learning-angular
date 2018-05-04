import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../app/auth/signin/auth.service'; 
import { Router } from '@angular/router';
import { map } from 'rxjs/operators/map';
@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor(public _authService:AuthenticationService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      //Checking For User LoggedIn Value
     if(!this._authService.getUserLoggedIn()){
       this.router.navigate(['signin']);
     }
    return this._authService.getUserLoggedIn();
  }

}
