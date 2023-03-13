import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CityModel } from '../models/city-model';
import { CurrentConditionsModel } from '../models/current-Conditions-model';
import { FewDaysWeatherModel } from '../models/fewDaysWeather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  onSendCity = new Subject<CityModel>();
  onSendFewDaysWeather = new Subject<FewDaysWeatherModel>();
  onSendCurrentConditions = new Subject<CurrentConditionsModel>();
  onSendTypeOfValue = new Subject<boolean>(); // saljemo vrednost true ili false u zavisnosti da li se klikne na celsius ili farenheit
  onSendWeatherIconPath = new Subject<string>(); //slanje putanje ikone koja je proverena metodom setWeatherIconPat
  onSendHourlyConditions = new Subject<Object>();
  onSendErrorMessage = new Subject<string>();


  weatherIconPath: string;





 apiKey ='KFkusRTauGh7AB8LxoJtbNxqF1tSKZzG';


   getCity(city:string) {
return this.http.get<Object>('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=' + this.apiKey + '&q=' + city);
}

   getFewDaysWeather(cityKey:string){
  return this.http.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + cityKey + '?apikey=' + this.apiKey + '&details=true&metric=true');
}

   getCurrentCondition(cityKey:string){
  return this.http.get('http://dataservice.accuweather.com/currentconditions/v1/' + cityKey + '?apikey=' + this.apiKey + '&details=true');
}

getHourlyWeather(cityKey:string){
  return this.http.get('http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' + cityKey + '?apikey=' + this.apiKey + '&details=true&metric=true');
}

setWeatherIconPath(weatherIconValue:number){ //proveramo na osnovu brojcane vrednosti ikone koja ikonica treba biti prikazana za trenutnu temp

  switch(weatherIconValue){
    case 1: this.weatherIconPath = 'assets/sunny.png';
    break;
    case 2: this.weatherIconPath = 'assets/mostly-sunny.png';
    break;
    case 3: this.weatherIconPath = 'assets/partly-sunny.png';
    break;
    case 4: this.weatherIconPath = 'assets/intermittent-clouds.png';
    break;
    case 5: this.weatherIconPath = 'assets/haze-sunshine.png';
    break;
    case 6: this.weatherIconPath = 'assets/mostly-cloudy.png';
    break;
    case 7: this.weatherIconPath = 'assets/cloudy.png';
    break;
    case 8: this.weatherIconPath = 'assets/overcast.png';
    break;
    case 11: this.weatherIconPath = 'assets/fog.png';
    break;
    case 12: this.weatherIconPath = 'assets/showers.png';
    break;
    case 13: this.weatherIconPath = 'assets/showers.png';
    break;
    case 14: this.weatherIconPath = 'assets/showers.png';
    break;
    case 15: this.weatherIconPath = 'assets/storm.png';
    break;
    case 16: this.weatherIconPath = 'assets/storm.png';
    break;
    case 17: this.weatherIconPath = 'assets/storm.png';
    break;
    case 18: this.weatherIconPath = 'assets/rainy.png';
    break;
    case 19: this.weatherIconPath = 'assets/flurries.png';
    break;
    case 20: this.weatherIconPath = 'assets/mostly-cloudy.png';
    break;
    case 21: this.weatherIconPath = 'assets/partly-sunny.png';
    break;
    case 22: this.weatherIconPath = 'assets/snowflake.png';
    break;
    case 23: this.weatherIconPath = 'assets/mostly-cloudy.png';
    break;
    case 24: this.weatherIconPath = 'assets/ice.png';
    break;
    case 25: this.weatherIconPath = 'assets/sleet.png';
    break;
    case 26: this.weatherIconPath = 'assets/freezing-rain.png';
    break;
    case 29: this.weatherIconPath = 'assets/mostly-cloudy.png';
    break;
    case 30: this.weatherIconPath = 'assets/hot.png';
    break;
    case 31: this.weatherIconPath = 'assets/cold.png';
    break;
    case 32: this.weatherIconPath = 'assets/wind.png';
    break;
    case 33: this.weatherIconPath = 'assets/moon2.png';
    break;
    case 34: this.weatherIconPath = 'assets/mostly-clear.png';
    break;
    case 35: this.weatherIconPath = 'assets/mostly-clear.png.png';
    break;
    case 36: this.weatherIconPath = 'assets/fulClouds.png';
    break;
    case 37: this.weatherIconPath = 'assets/foggy-night.png';
    break;
    case 38: this.weatherIconPath = 'assets/mostly-clear.png';
    break;
    case 39: this.weatherIconPath = 'assets/showers-night.png';
    break;
    case 40: this.weatherIconPath = 'assets/showers-night.png';
    break;
    case 41: this.weatherIconPath = 'assets/storm-night.png';
    break;
    case 42: this.weatherIconPath = 'assets/storm-night.png';
    break;
    case 43: this.weatherIconPath = 'assets/flurries.png';
    break;
    case 44: this.weatherIconPath = 'assets/night-snow.png';
    break;

}

}

onSendIconPath(){

  this.onSendWeatherIconPath.next(this.weatherIconPath); //saljemo proverenu putanju do odredjene slike za trenutnu temp
}


}
