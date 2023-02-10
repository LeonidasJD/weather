import { Component } from '@angular/core';
import { map } from 'rxjs';
import { CityModel } from '../shared/city-model';
import { CurrentConditionsModel } from '../shared/current-Conditions-model';
import { FewDaysWeatherModel } from '../shared/fewDaysWeather';
import { WeatherService } from '../weather-service/weather.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  constructor(private weatherService:WeatherService){}

  city:string; // ono sto upisemo u search

  cityKey:string; //id grada koji sluzi za prognozu

  tempInFarenheit = false;

  ngOnInit(){
    
  };

  onFarenheit(){ //metoda kojom ispisujemo vrednosti u farenheit i miles

    this.tempInFarenheit = true;
    console.log(this.tempInFarenheit);

    this.weatherService.onSendTypeOfValue.next(this.tempInFarenheit);

  }

  onCelsius(){ //metoda kojom postavljamo vrednost na celsius i km/h
    this.tempInFarenheit = false;
    console.log(this.tempInFarenheit);

    this.weatherService.onSendTypeOfValue.next(this.tempInFarenheit);
  }

  searchCity(){

    this.weatherService.onSendTypeOfValue.next(this.tempInFarenheit);

    this.weatherService.getCity(this.city).subscribe(response => {
      console.log(response);
      console.log(response[0].Key);
      this.cityKey = response[0].Key;     //preuzimanje informacije o trazenom gradu i uzimanje njegovog ID kljuca

      let cityName = response[0].EnglishName;
      let countryName = response[0]['Country'].LocalizedName;

      const city = new CityModel (
        cityName,
        countryName
      );

      this.weatherService.onSendCity.next(city);

      this.weatherService.getFewDaysWeather(this.cityKey).subscribe(weatherResponse => {           //preuzimanje informacija o prognozi za odredjeni grad za 5 dana 
        console.log( weatherResponse);


        let minTemp = weatherResponse['DailyForecasts'][0]['Temperature']['Minimum'].Value;;
        let maxTemp = weatherResponse['DailyForecasts'][0]['Temperature']['Maximum'].Value;
        let currentDate = new Date (weatherResponse['DailyForecasts'][0].Date);
        let air = weatherResponse['DailyForecasts'][0]['AirAndPollen'][0].Category;
        let fiveDaysWeather = weatherResponse['DailyForecasts'];


        const fewDaysWeather = new FewDaysWeatherModel(
          minTemp,
          maxTemp,
          currentDate,
          air,
          fiveDaysWeather

        );

        this.weatherService.onSendFewDaysWeather.next(fewDaysWeather);



        })

        this.weatherService.getCurrentCondition(this.cityKey).subscribe((current => { //preuzimanje prognoze za trenutni dan
          console.log(current);

          let tempMetric = current[0]['Temperature']['Metric'].Value;
          let tempImperial = current[0]['Temperature']['Imperial'].Value
          let humidity = current[0].IndoorRelativeHumidity;
          let uvIndex = current[0].UVIndexText;
          let percipitation = current[0]['Precip1hr']['Metric'].Value;
          let wind = current[0]['Wind']['Speed']['Metric'].Value;
          let preasure = current[0]['Pressure']['Metric'].Value;
          let feelsLike = current[0]['RealFeelTemperature']['Metric'].Value;
          let visibility = current[0]['Visibility']['Metric'].Value;

          if(tempMetric !=undefined || tempMetric !=null){
            const cuurentCondition = new CurrentConditionsModel(
              tempMetric,
              tempImperial,
              humidity,
              uvIndex,
              percipitation,
              wind,
              preasure,
              feelsLike,
              visibility
            );


          this.weatherService.onSendCurrentConditions.next(cuurentCondition);

          }

        }));

    });

  }



}
