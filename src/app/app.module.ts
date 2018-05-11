import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HttpModule } from '@angular/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardGuard } from './authguard.guard';
import { AuthguardcourseGuard } from './authguardcourse.guard';
import { AuthenticationService } from '../app/auth/signin/auth.service'; 
import { CookieService } from './auth/cookie.service';
import { VideoCenterComponent } from './dashboard/video-center/video-center.component';
import { VideoListComponent } from './dashboard/video-list/video-list.component';
import { VideoDetailComponent } from './dashboard/video-detail/video-detail.component';
import { SafePipe } from './safe.pipe';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { MyprofileComponent } from './myprofile/myprofile.component';

//Path For Routing
const rt: Routes = [
  {path:'signup',component: SignupComponent },
  {path:'signin',component: SigninComponent },
  {path:'home',component: HomeComponent },
  {path:'courses',component: CoursesComponent },
  {path:'dashboard',canActivate:[AuthguardGuard],component: DashboardComponent },
  {path:'addcourses',canActivate:[AuthguardcourseGuard],component: AddcourseComponent },
  {path:'myprofile',canActivate:[AuthguardGuard],component: MyprofileComponent },
  {path:'coursecontent',canActivate:[AuthguardGuard],component:VideoCenterComponent },
  {path:'',redirectTo: '/home',pathMatch:'full' },
  {path:'**',component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesComponent,
    SignupComponent,
    SigninComponent,
    PageNotFoundComponent,
    DashboardComponent,
    VideoCenterComponent,
    VideoListComponent,
    VideoDetailComponent,
    SafePipe,
    AddcourseComponent,
    MyprofileComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    HttpModule,
    RouterModule.forRoot(rt)
  ],
  providers: [AuthguardGuard,AuthguardcourseGuard,AuthenticationService,CookieService],
  bootstrap: [AppComponent]
})

export class AppModule { }
