export class CurrentConditionsModel{

tempMetric:number;
tempImperial:number;
humidity:number;
uvIndex:string;
percipitation:number;
wind:number;
preasure:number;
feelsLike:number;
visibility:number;



  constructor(tempMetric:number,tempImperial:number,humidity:number,uvIndex:string,percipitation:number,wind:number,preasure:number,feelsLike:number,visibility:number,){

    this.tempMetric = tempMetric;
    this.tempImperial = tempImperial;
    this.humidity = humidity;
    this.uvIndex = uvIndex;
    this.percipitation = percipitation;
    this.wind = wind;
    this.preasure = preasure;
    this.feelsLike = feelsLike;
    this.visibility = visibility;


  }
}
