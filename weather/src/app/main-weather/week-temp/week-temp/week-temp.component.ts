import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/shared/weather-service/weather.service';

@Component({
  selector: 'app-week-temp',
  templateUrl: './week-temp.component.html',
  styleUrls: ['./week-temp.component.css']
})
export class WeekTempComponent implements OnDestroy {


  @Input() id: number;
  daysOfWeek: Date[] = [];
  fiveDaysWeather: Object;
  typeOfValue: boolean;
  iconPath: string;
  subscriptions: Subscription;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

    for (let i = 0; i < 5; i++) {
      const day = new Date();
      day.setDate(day.getDate() + i);
      this.daysOfWeek.push(day);
    }

    this.subscriptions = this.weatherService.onSendFewDaysWeather.subscribe((response => {
      this.fiveDaysWeather = response.fiveDays;

    }));

    this.subscriptions = this.weatherService.onSendTypeOfValue.subscribe((valueResponse => { this.typeOfValue = valueResponse }));

    this.subscriptions = this.weatherService.onSendWeatherIconPath.subscribe((iconResponse => { this.iconPath = iconResponse }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
