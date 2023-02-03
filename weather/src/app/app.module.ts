import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MainWeatherComponent } from './main-weather/main-weather.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { CurrentTempComponent } from './main-weather/current-temp/current-temp/current-temp.component';
import { WeekTempComponent } from './main-weather/week-temp/week-temp/week-temp.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    MainWeatherComponent,
    WeatherDetailsComponent,
    CurrentTempComponent,
    WeekTempComponent,

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
