import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  show:Boolean;
  html:Boolean;
  angular:Boolean;
  node:Boolean;
  deep:Boolean;
  constructor() {
    this.show=true;
    this.html=false;
    this.angular=false;
    this.node=false;
    this.deep=false;
   }
   
   html_1()
   {
     this.show=false;
     this.html=true;
   }
   angular_1()
   {
     this.show=false;
     this.angular=true;
   }
   node_1()
   {
     this.show=false;
     this.node=true;
   }
   deep_1()
   {
     this.show=false;
     this.deep=true;
   }
   back_html_1()
   {
     this.show=true;
     this.html=false;
   }
   back_angular_1()
   {
     this.show=true;
     this.angular=false;
   }
   back_node_1()
   {
     this.show=true;
     this.node=false;
   }
   back_deep_1()
   {
     this.show=true;
     this.deep=false;
   }
  ngOnInit() {
  }

}
