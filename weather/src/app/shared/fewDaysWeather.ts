export class FewDaysWeatherModel {

currentTempMin: number;
currentTempMax: number;
currentDate:Date;
air:string
fiveDays:Object
watherText:string;

constructor(currentTempMin: number, currentTempMax: number,currentDate:Date,air:string,fiveDays:Object,watherText:string) {

this.currentTempMin = currentTempMin;
this.currentTempMax = currentTempMax;
this.currentDate = currentDate;
this.air =air;
this.fiveDays = fiveDays;
this.watherText= watherText;

}



}
