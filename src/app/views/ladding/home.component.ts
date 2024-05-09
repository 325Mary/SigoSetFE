import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './ladding.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor (private router: Router){}
  ngOnInit() {}
  goToAbout(){
    this.router.navigate(['/login/'])
  }
}
