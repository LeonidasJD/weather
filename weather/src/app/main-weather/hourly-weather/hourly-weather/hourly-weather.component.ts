import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/shared/weather-service/weather.service';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.css']
})
export class HourlyWeatherComponent implements OnDestroy {

  hours = [];
  hourlyConditions: Object;
  typeOfValue: boolean;
  subscriptions: Subscription;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

    for (let i = 0; i < 12; i++) {
      const now = new Date();
      this.hours.push(now.getHours() + 1 + i); // dodato je + 1 pa + i zato sto api vraca podatke ne od trenutnog sata nego od sledeceg sata pa narednih 12 sati
    }
    this.subscriptions = this.weatherService.onSendHourlyConditions.subscribe((hourlyResponse) => { this.hourlyConditions = hourlyResponse });

    this.subscriptions = this.weatherService.onSendTypeOfValue.subscribe((responseValue) => { this.typeOfValue = responseValue });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
