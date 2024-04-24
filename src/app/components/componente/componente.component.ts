import { Component, OnInit } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.css']
})
export class ComponenteComponent implements OnInit {

  openalert: boolean = false
  constructor() { }

  ngOnInit(): void {
  }
  mostarconsola(name:string){
  console.log(name);
  this.openalert=true
  
  }

}
