import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../app/auth/signin/auth.service'; 
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard', 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  name;
  constructor(public _authService:AuthenticationService,private route: ActivatedRoute,private router: Router) { }
 
  logout(){
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/home'])
  }
  ngOnInit() {
    
     this.route.params.subscribe(params => {
      this.name = params.name
   });
  }

}
