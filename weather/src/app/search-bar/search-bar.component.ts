import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private weatherService:WeatherService, private router:Router,private route:ActivatedRoute){}

  city:string; // ono sto upisemo u search

  cityKey:string; //id grada koji sluzi za prognozu

  tempInCelsius = true;



  spinerIn = false;

  ngOnInit(){

  };

  onFarenheit(){ //metoda kojom ispisujemo vrednosti u farenheit i miles

    this.tempInCelsius = false;

    this.weatherService.onSendTypeOfValue.next(this.tempInCelsius);

  }

  onCelsius(){ //metoda kojom postavljamo vrednost na celsius i km/h
    this.tempInCelsius = true;

    this.weatherService.onSendTypeOfValue.next(this.tempInCelsius);
  }





  searchCity(){     // izvrsava se postavljanje spinera na jednu sekundu zatim preuzimanje svih informacija iz apija a onda izvrsavanje rute i prikaz svih informacija
    this.spinerIn = true;

    setTimeout(() => {
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
          let weatherText = weatherResponse['DailyForecasts'][0]['Day'].IconPhrase;




          const fewDaysWeather = new FewDaysWeatherModel(
            minTemp,
            maxTemp,
            currentDate,
            air,
            fiveDaysWeather,
            weatherText
          );

          this.weatherService.onSendFewDaysWeather.next(fewDaysWeather);

          this.weatherService.onSendTypeOfValue.next(this.tempInCelsius);




          })

          this.weatherService.getCurrentCondition(this.cityKey).subscribe((current => { //preuzimanje prognoze za trenutni dan
            console.log(current);

            let tempMetric = current[0]['Temperature']['Metric'].Value;
            let tempImperial = current[0]['Temperature']['Imperial'].Value
            let humidity = current[0].IndoorRelativeHumidity;
            let uvIndex = current[0].UVIndexText;
            let percipitation = current[0]['Precip1hr']['Metric'].Value;
            let windMetric = current[0]['Wind']['Speed']['Metric'].Value;
            let windImperial = current[0]['Wind']['Speed']['Imperial'].Value;
            let preasureMetric = current[0]['Pressure']['Metric'].Value;
            let preasureImperial = current[0]['Pressure']['Imperial'].Value;
            let feelsLikeMetric = current[0]['RealFeelTemperature']['Metric'].Value;
            let feelsLikeImperial = current[0]['RealFeelTemperature']['Imperial'].Value;
            let visibilityMetric = current[0]['Visibility']['Metric'].Value;
            let visibilityImperial = current[0]['Visibility']['Imperial'].Value;
            let weatherText = current[0].WeatherText;
            let weatherIcon = current[0].WeatherIcon;

            if(tempMetric !=undefined || tempMetric !=null){
              const cuurentCondition = new CurrentConditionsModel(
                tempMetric,
                tempImperial,
                humidity,
                uvIndex,
                percipitation,
                windMetric,
                windImperial,
                preasureMetric,
                preasureImperial,
                feelsLikeMetric,
                feelsLikeImperial,
                visibilityMetric,
                visibilityImperial,
                weatherText,
                weatherIcon
              );


            this.weatherService.onSendCurrentConditions.next(cuurentCondition); //salje podatke o trenutnom vremenu

            this.weatherService.setWeatherIconPath(weatherIcon); // proverava koja je numericka vrednost ikonice za vreme i postavlja odredjenu ikonicu iz asets
            this.weatherService.onSendIconPath(); //salje putanju do ikonice ,a na taj podataka se pretplacijume u komponenti current-temp



            }

          }));

        });

        this.router.navigate(['/search/weather-conditions']);

        this.spinerIn = false;
    },1000);






  }



}
