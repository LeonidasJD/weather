import { Component, Input } from '@angular/core';
import { WeatherService } from 'src/app/shared/weather-service/weather.service';

@Component({
  selector: 'app-week-temp',
  templateUrl: './week-temp.component.html',
  styleUrls: ['./week-temp.component.css']
})
export class WeekTempComponent {


  @Input() id: number;
  daysOfWeek: Date[] = [];
  fiveDaysWeather: Object;
  typeOfValue: boolean;
  iconPath: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

    for (let i = 0; i < 5; i++) {
      const day = new Date();
      day.setDate(day.getDate() + i);
      this.daysOfWeek.push(day);
    }

    this.weatherService.onSendFewDaysWeather.subscribe((response => {
      this.fiveDaysWeather = response.fiveDays;

    }));

    this.weatherService.onSendTypeOfValue.subscribe((valueResponse => { this.typeOfValue = valueResponse }));

    this.weatherService.onSendWeatherIconPath.subscribe((iconResponse => { this.iconPath = iconResponse }))
  }
}
