import { Component } from '@angular/core';
import { WeatherService } from '../weather-service/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent {

  constructor(private weatherService:WeatherService){}

  uvIndex:string;
  air:string;
  precipitation:number;
  humidity:number;
  wind:number;
  pressure:number;
  feelsLike:number;
  visibility:number;

ngOnInit(){

  this.weatherService.onSendCurrentConditions.subscribe((responseCurrentCond =>{

    this.uvIndex = responseCurrentCond.uvIndex;
    this.precipitation = responseCurrentCond.percipitation;
    this.humidity = responseCurrentCond.humidity;
    this.wind = responseCurrentCond.wind;
    this.pressure = responseCurrentCond.preasure;
    this.feelsLike = responseCurrentCond.feelsLike;
    this.visibility = responseCurrentCond.visibility;
  }))

  this.weatherService.onSendFewDaysWeather.subscribe((responseWeather =>{
    this.air = responseWeather.air;
  }))
}

}
