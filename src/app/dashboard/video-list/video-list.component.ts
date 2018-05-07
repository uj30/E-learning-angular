import { Component, OnInit, EventEmitter } from '@angular/core';
import { Video } from '../../video';
import { AuthenticationService } from '../../../app/auth/signin/auth.service'; 
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from '../../auth/cookie.service';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  inputs: ['videos'],
  outputs: ['SelectVideo']
})
export class VideoListComponent implements OnInit {

  name;
  type_of_user;
  public SelectVideo = new EventEmitter();
  constructor(public _authService:AuthenticationService,private route: ActivatedRoute,private router: Router,private _cookieService:CookieService) { }

  logout(){
    this._cookieService.remove('isLogedIn',null,null);
    this._cookieService.remove('name',null,null);
    this._cookieService.remove('type_of_user',null,null);
    this._cookieService.remove('userid',null,null);
  //  this._cookieService.remove('courses',null,null);
    this.router.navigate(['/home'])
  }

  ngOnInit() {
    this.name=this._cookieService.get("name");
this.type_of_user=this._cookieService.get("type_of_user");
console.log(this.type_of_user);
     this.route.params.subscribe(params => {
      this.name = params.name
   });
  }

  onSelect(vid: Video){
    this.SelectVideo.emit(vid);
  }

}
