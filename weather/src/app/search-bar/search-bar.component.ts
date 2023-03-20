import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CityModel } from '../shared/models/city-model';
import { CurrentConditionsModel } from '../shared/models/current-Conditions-model';
import { FewDaysWeatherModel } from '../shared/models/fewDaysWeather';

import { WeatherService } from '../shared/weather-service/weather.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnDestroy {


  city: string; // ono sto upisemo u search
  cityKey: string; //id grada koji sluzi za prognozu
  tempInCelsius = true;
  spinerIn = false;
  errorMessage = '';
  cityCreated: boolean = false;
  inputClicked: boolean = false;
  ipAddress: string;
  getLocationCity: string;
  getLocationCountry: string;
  subscriptions: Subscription;

  constructor(private weatherService: WeatherService, private router: Router, private route: ActivatedRoute) { }
  

  ngOnInit() { };

  onFarenheit() { //metoda kojom ispisujemo vrednosti u farenheit i miles
    this.tempInCelsius = false;
    this.weatherService.onSendTypeOfValue.next(this.tempInCelsius);
  }

  onCelsius() { //metoda kojom postavljamo vrednost na celsius i km/h
    this.tempInCelsius = true;
    this.weatherService.onSendTypeOfValue.next(this.tempInCelsius);
  }

  searchCity() {      // izvrsava se postavljanje spinera  zatim preuzimanje svih informacija iz apija a onda izvrsavanje rute i prikaz svih informacija

    if (!this.city) {
      this.errorMessage = "Please insert a location !"
      this.cityCreated = false;
    } else {
      this.spinerIn = true;
      this.errorMessage = '';
      this.cityCreated = true;

      this.subscriptions = this.weatherService.getCity(this.city).subscribe(
        response => {
          if (response[0] === undefined) {
            this.errorMessage = "Please insert a valid location !"
            this.spinerIn = false;
            this.cityCreated = false;
          }
          console.log(response);
          console.log(response[0].Key);
          this.cityKey = response[0].Key;
          console.log(this.cityKey);

          //preuzimanje informacije o trazenom gradu i uzimanje njegovog ID kljuca

          let cityName = response[0].EnglishName;
          let countryName = response[0]['Country'].LocalizedName;

          const cityModel: CityModel = {
            cityName: cityName,
            countryName: countryName
          };
          this.weatherService.onSendCity.next(cityModel);

          this.subscriptions = this.weatherService.getFewDaysWeather(this.cityKey).subscribe(weatherResponse => {           //preuzimanje informacija o prognozi za odredjeni grad za 5 dana
            console.log(weatherResponse);
            let minTemp = weatherResponse['DailyForecasts'][0]['Temperature']['Minimum'].Value;;
            let maxTemp = weatherResponse['DailyForecasts'][0]['Temperature']['Maximum'].Value;
            let currentDate = new Date(weatherResponse['DailyForecasts'][0].Date);
            let air = weatherResponse['DailyForecasts'][0]['AirAndPollen'][0].Category;
            let fiveDaysWeather = weatherResponse['DailyForecasts'];
            let weatherText = weatherResponse['DailyForecasts'][0]['Day'].IconPhrase;

            const fewDaysWeather: FewDaysWeatherModel = {
              currentTempMin: minTemp,
              currentTempMax: maxTemp,
              currentDate: currentDate,
              air: air,
              fiveDays: fiveDaysWeather,
              watherText: weatherText
            };

            this.weatherService.onSendFewDaysWeather.next(fewDaysWeather);

            this.weatherService.onSendTypeOfValue.next(this.tempInCelsius);
          })

          this.subscriptions = this.weatherService.getCurrentCondition(this.cityKey).subscribe((current => { //preuzimanje prognoze za trenutni dan
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

            if (tempMetric != undefined || tempMetric != null) {
              const cuurentCondition: CurrentConditionsModel = {
                tempMetric: tempMetric,
                tempImperial: tempImperial,
                humidity: humidity,
                uvIndex: uvIndex,
                percipitation: percipitation,
                windMetric: windMetric,
                windImperial: windImperial,
                preasureMetric: preasureMetric,
                preasureImperial: preasureImperial,
                feelsLikeMetric: feelsLikeMetric,
                feelsLikeImperial: feelsLikeImperial,
                visibilityMetric: visibilityMetric,
                visibilityImperial: visibilityImperial,
                weatherText: weatherText,
                weatherIcon: weatherIcon
              };

              this.weatherService.onSendCurrentConditions.next(cuurentCondition); //salje podatke o trenutnom vremenu
              this.weatherService.setWeatherIconPath(weatherIcon); // proverava koja je numericka vrednost ikonice za vreme i postavlja odredjenu ikonicu iz asets
              this.weatherService.onSendIconPath(); //salje putanju do ikonice ,a na taj podataka se pretplacijume u komponenti current-temp
            }
          }));

          this.subscriptions = this.weatherService.getHourlyWeather(this.cityKey).subscribe((hourlyResponse) => {
            console.log(hourlyResponse)
            let hours12 = hourlyResponse;

            this.weatherService.onSendHourlyConditions.next(hours12);
          })

          this.spinerIn = false;
        },
        errorResponse => {
          console.log(errorResponse);
          this.spinerIn = false;
          switch (errorResponse.name) {
            case 'HttpErrorResponse': this.errorMessage = 'HTTP failure response !';
              break;
          }
        }
      );
    }
    this.inputClicked = false;
  }

  popUpButton() {
    this.inputClicked = !this.inputClicked;
    console.log('input clicked');
  }

  someMethod() {
    this.weatherService.getIpAddress().subscribe((ipResponse => {
      this.ipAddress = ipResponse['ip'];
    }));
    this.weatherService.getLocation(this.ipAddress).subscribe((responseLocation => {
      this.getLocationCity = responseLocation['city'];
      this.getLocationCountry = responseLocation['country'];
      this.city = `${this.getLocationCity},${this.getLocationCountry}`;
      this.inputClicked = false;
    }))
  }

ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
}


