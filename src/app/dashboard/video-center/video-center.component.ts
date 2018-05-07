import { Component, OnInit } from '@angular/core';
import { Video } from '../../video';
import { Router } from '@angular/router';
import { VideoService } from '../../video.service';
import { CookieService } from '../../auth/cookie.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService,CookieService]
  
})
export class VideoCenterComponent implements OnInit {

   videos: Array<Video>;
   selectedVideo: Video;
   name
   type_of_user
   courseName
  constructor(private _videoService: VideoService,private router: Router,private _cookieService:CookieService) { }
  

  logout(){
    this._cookieService.remove('isLogedIn',null,null);
    this._cookieService.remove('name',null,null);
    this._cookieService.remove('type_of_user',null,null);
    this._cookieService.remove('userid',null,null);
    this.router.navigate(['/home'])
  }
  ngOnInit() {
    var id=this._cookieService.get("course_id");
    this._videoService.getVideos()
      .then((res)=>{
        console.log("Check",res);
        for(let i=0;i<res.length;i++)
        {
          console.log("in for",res[i]._id,"dfef",id);
          
          if(res[i]._id==id)
          {
            this.courseName=res[i].course_name;
            this.videos=res[i].content;
          }
        }
      })
      this.name=this._cookieService.get("name");
this.type_of_user=this._cookieService.get("type_of_user");
  }
  onSelectVideo(video:any){
     this.selectedVideo = video;
    console.log(this.selectedVideo);
   }
   
}
