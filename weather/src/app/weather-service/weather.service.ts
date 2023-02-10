import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CityModel } from '../shared/city-model';
import { CurrentConditionsModel } from '../shared/current-Conditions-model';
import { FewDaysWeatherModel } from '../shared/fewDaysWeather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  onSendCity = new Subject<CityModel>();
  onSendFewDaysWeather = new Subject<FewDaysWeatherModel>();
  onSendCurrentConditions = new Subject<CurrentConditionsModel>();
  onSendTypeOfValue = new Subject<boolean>(); // saljemo vrednost true ili false u zavisnosti da li se klikne na celsius ili farenheit


 apiKey ='NlbyiKhTea06qQY7ajXpx93G8Dry4UtE';


getCity(city:string) {
return this.http.get<Object>('http://dataservice.accuweather.com/locations/v1/cities/search?apikey='+this.apiKey+'&q=' + city);
}

getFewDaysWeather(cityKey:string){
  return this.http.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + cityKey + '?apikey=' + this.apiKey + '&details=true&metric=true');
}

getCurrentCondition(cityKey:string){
  return this.http.get('http://dataservice.accuweather.com/currentconditions/v1/' + cityKey + '?apikey=' + this.apiKey + '&details=true');
}



}
