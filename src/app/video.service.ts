import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class VideoService {

  constructor(private _http:Http) { }

  getVideos(){
    return this._http.get("http://localhost:3000/api/totalcourses")
    .toPromise().then((res)=>{
      var res1=res.json();
      return res1;
    })
  }

}
