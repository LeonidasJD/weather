import { Component, Input } from '@angular/core';
import { WeatherService } from 'src/app/shared/weather-service/weather.service';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.css']
})
export class HourlyWeatherComponent {

  hours = [];
  hourlyConditions: Object;
  typeOfValue: boolean;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

    for (let i = 0; i < 12; i++) {
      const now = new Date();
      this.hours.push(now.getHours() + 1 + i); // dodato je + 1 pa + i zato sto api vraca podatke ne od trenutnog sata nego od sledeceg sata pa narednih 12 sati
    }
    this.weatherService.onSendHourlyConditions.subscribe((hourlyResponse) => { this.hourlyConditions = hourlyResponse });

    this.weatherService.onSendTypeOfValue.subscribe((responseValue) => { this.typeOfValue = responseValue });
  }
}
