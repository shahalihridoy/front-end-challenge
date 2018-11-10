import { Component, HostListener } from '@angular/core';
import {Http} from '@angular/http';  
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'FrontEndChallenge';
  items;
  items2;
  items3;
  show2 = true;
  show1 = true;
  show3 = true;
  showDropDown = true;
  showMobile = false;
  item_number;

  @HostListener('document:click',['$event']) showDrop(){
    var id = event.target['id'];
    if(id == "dropShow"){
      this.showDropDown = !this.showDropDown;
    }
    else if(id == "mini_icon"){
      this.showMobile = !this.showMobile;
    }
    else if(id == "input")
      return;
    else {
      this.showDropDown = true;
      this.showMobile = false;
    }
  }

  constructor(private http: Http) { 
    var n = localStorage.getItem("item_number");
    if(n == null)
    this.fetchData(30);
    else{
      this.item_number = n;
      this.fetchData(n);
    }
    
  }

  setItem(){
    this.fetchData(this.item_number);
    localStorage.setItem("item_number",this.item_number);
    // this.items = this.items.slice(0,this.item_number);
    // this.items2 = this.items2.slice(0,this.item_number);
    // this.items3 = this.items3.slice(0,this.item_number);
  }

  fetchData(num){
    this.http.get("http://localhost:3000/@MakeSchool-"+num)
    .subscribe(e=>{
      this.show1 = false;
      this.items = e.json();
    });

    this.http.get("http://localhost:3000/@newsycombinator-"+num)
    .subscribe(e=>{
      this.show2 = false;
      this.items2 = e.json();
    });

    this.http.get("http://localhost:3000/@ycombinator-"+num)
    .subscribe(e=>{
      this.show3 = false;
      this.items3 = e.json();
    });
  }
}