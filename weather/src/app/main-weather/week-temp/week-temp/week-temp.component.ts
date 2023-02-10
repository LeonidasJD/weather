import { Component, Input } from '@angular/core';
import { WeatherService } from 'src/app/weather-service/weather.service';

@Component({
  selector: 'app-week-temp',
  templateUrl: './week-temp.component.html',
  styleUrls: ['./week-temp.component.css']
})
export class WeekTempComponent {

  constructor(private weatherService:WeatherService){}


  daysOfWeek:Date[] = [];
  fiveDaysWeather:Object;

  typeOfValue:boolean;



  ngOnInit(){

   for(let i = 0; i < 5; i++) {
     const day = new Date();
     day.setDate(day.getDate() + i);
     this.daysOfWeek.push(day);
     }

  this.weatherService.onSendFewDaysWeather.subscribe((response => {
  this.fiveDaysWeather = response.fiveDays;

}));

  this.weatherService.onSendTypeOfValue.subscribe((valueResponse => {this.typeOfValue = valueResponse}));

   }



}
