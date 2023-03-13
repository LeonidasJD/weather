import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from './shared/weather-service/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/search']);

  }

  title = 'weather';
}
