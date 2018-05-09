import { Component, OnInit } from '@angular/core';
import { CookieService } from '../auth/cookie.service';
import { AuthenticationService } from '../../app/auth/signin/auth.service'; 
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css'],
  providers:[ CookieService]
})
export class CourseContentComponent implements OnInit {
courseid;
  constructor(public _authService:AuthenticationService,private route: ActivatedRoute,private router: Router,private _cookieService:CookieService) { }

  ngOnInit() {
this.courseid=this._cookieService.get("usercourseid");
  }

}
