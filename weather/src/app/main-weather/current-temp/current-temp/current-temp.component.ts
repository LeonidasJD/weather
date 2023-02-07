import { Component } from '@angular/core';
import { WeatherService } from 'src/app/weather-service/weather.service';
import { MainWeatherComponent } from '../../main-weather.component';

@Component({
  selector: 'app-current-temp',
  templateUrl: './current-temp.component.html',
  styleUrls: ['./current-temp.component.css']
})
export class CurrentTempComponent {

constructor(private weatherService:WeatherService){}

city:string; //ime grada
country:string; // ime drzave

currentTemp:number; //trenutna tremperatura

currentDate:Date; //danasnji datum
ngOnInit(){

  this.weatherService.onSendCity.subscribe((responseCity => {this.city = responseCity.cityName; this.country = responseCity.countryName}));

  this.weatherService.onSendFewDaysWeather.subscribe((responseWeather => {this.currentDate = responseWeather.currentDate;}));

  this.weatherService.onSendCurrentConditions.subscribe((responseCurrentCond => {this.currentTemp = responseCurrentCond.tempMetric}));


}
}
