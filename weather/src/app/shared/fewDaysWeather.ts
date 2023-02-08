export class FewDaysWeatherModel {

currentTempMin: number;
currentTempMax: number;
currentDate:Date;
air:string
fiveDays:Object

constructor(currentTempMin: number, currentTempMax: number,currentDate:Date,air:string,fiveDays:Object) {

this.currentTempMin = currentTempMin;
this.currentTempMax = currentTempMax;
this.currentDate = currentDate;
this.air =air;
this.fiveDays = fiveDays;

}



}
