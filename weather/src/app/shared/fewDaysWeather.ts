export class FewDaysWeatherModel {

currentTempMin: number;
currentTempMax: number;
currentDate:Date;
air:string

constructor(currentTempMin: number, currentTempMax: number,currentDate:Date,air:string) {

this.currentTempMin = currentTempMin;
this.currentTempMax = currentTempMax;
this.currentDate = currentDate;
this.air =air;

}



}
