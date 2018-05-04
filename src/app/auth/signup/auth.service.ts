import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Options } from 'selenium-webdriver/ie';
@Injectable()
export class AuthenticationService {

  constructor(private http:Http) { }

 //For Registering User In Database
   getregister(user) {
     return  this.http.post('http://localhost:3000/api/signup',user)
      .toPromise()
      .then((res)=> {
        return res;
      });
  }

}
