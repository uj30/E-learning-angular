import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Options } from 'selenium-webdriver/ie';
@Injectable()
export class AuthenticationService {

  constructor(private http:Http) { }

 
   getregister(user) {
       console.log(user);
       this.http.post('http://localhost:3000/api/signup',user)
      .toPromise()
      .then((res)=> console.log(res));

  }

}
