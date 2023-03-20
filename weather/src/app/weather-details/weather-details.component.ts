import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../shared/weather-service/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnDestroy {

  uvIndex: string;
  air: string;
  precipitation: number;
  humidity: number;
  windMetric: number;
  windImperial: number;
  pressureMetric: number;
  pressureImperial: number;
  feelsLikeMetric: number;
  feelsLikeImperial: number;
  visibilityMetric: number;
  visibilityImperial: number;
  typeOfValue: boolean;
  subscriptions: Subscription

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

    this.subscriptions = this.weatherService.onSendCurrentConditions.subscribe((responseCurrentCond => {

      this.uvIndex = responseCurrentCond.uvIndex;
      this.precipitation = responseCurrentCond.percipitation;
      this.humidity = responseCurrentCond.humidity;
      this.windMetric = responseCurrentCond.windMetric;
      this.windImperial = responseCurrentCond.windImperial;
      this.pressureMetric = responseCurrentCond.preasureMetric;
      this.pressureImperial = responseCurrentCond.preasureImperial;
      this.feelsLikeMetric = responseCurrentCond.feelsLikeMetric;
      this.feelsLikeImperial = responseCurrentCond.feelsLikeImperial;
      this.visibilityMetric = responseCurrentCond.visibilityMetric;
      this.visibilityImperial = responseCurrentCond.visibilityImperial;
    }))

    this.subscriptions = this.weatherService.onSendFewDaysWeather.subscribe((responseWeather => {
      this.air = responseWeather.air;
    }))

    this.subscriptions = this.weatherService.onSendTypeOfValue.subscribe((responseValue => { this.typeOfValue = responseValue }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
