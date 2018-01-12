import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  potName = 'Holiday fund';
  potBalance = '£471.72';
  potIcon = 'assets/holiday.png';
  progress = 'assets/progress-bar.jpg';
}
