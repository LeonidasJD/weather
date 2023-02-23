import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MainWeatherComponent } from './main-weather/main-weather.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { CurrentTempComponent } from './main-weather/current-temp/current-temp/current-temp.component';
import { WeekTempComponent } from './main-weather/week-temp/week-temp/week-temp.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule, Routes } from '@angular/router';
import { WeatherConditionsComponent } from './weather-conditions/weather-conditions.component';

const route:Routes = [
{path: 'search', component: SearchBarComponent, children:[

 {path: 'weather-conditions', component: WeatherConditionsComponent}
]},




]

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    MainWeatherComponent,
    WeatherDetailsComponent,
    CurrentTempComponent,
    WeekTempComponent,
    WeatherConditionsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
