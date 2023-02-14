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

currentTempMetric:number; //trenutna tremperatura
currentTempImperial:number;

currentDate:Date; //danasnji datum

typeOfValue:boolean;   //ovde postavljamo vrednost true ili false ,kada se klikne na dugme celsius ili farenhet

weatherText:string; //pokazuje text  wremena

iconPath:string; // putanja do ikonice koja se postavlja na osnovu temperature



ngOnInit(){

  this.weatherService.onSendCity.subscribe((responseCity => {this.city = responseCity.cityName; this.country = responseCity.countryName}));

  this.weatherService.onSendFewDaysWeather.subscribe((responseWeather => {this.currentDate = responseWeather.currentDate;}));

  this.weatherService.onSendCurrentConditions.subscribe((responseCurrentCond => {

    this.currentTempMetric = responseCurrentCond.tempMetric;
    this.currentTempImperial = responseCurrentCond.tempImperial;
    this.weatherText = responseCurrentCond.weatherText;



}));

this.weatherService.onSendTypeOfValue.subscribe((valueResponse => {this.typeOfValue = valueResponse})); // proveravamo da li je true ili false ,da li je celsius ili farenheit

this.weatherService.onSendWeatherIconPath.subscribe((responseIconPath => {this.iconPath = responseIconPath}));





}
}
