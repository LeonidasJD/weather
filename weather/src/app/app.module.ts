import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MainWeatherComponent } from './main-weather/main-weather.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    MainWeatherComponent,
    WeatherDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
