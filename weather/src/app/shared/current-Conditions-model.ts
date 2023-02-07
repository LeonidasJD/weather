export class CurrentConditionsModel{

tempMetric:number;
humidity:number;
uvIndex:string;
percipitation:number;
wind:number;
preasure:number;
feelsLike:number;
visibility:number;



  constructor(tempMetric:number,humidity:number,uvIndex:string,percipitation:number,wind:number,preasure:number,feelsLike:number,visibility:number,){

    this.tempMetric = tempMetric;
    this.humidity = humidity;
    this.uvIndex = uvIndex;
    this.percipitation = percipitation;
    this.wind = wind;
    this.preasure = preasure;
    this.feelsLike = feelsLike;
    this.visibility = visibility;


  }
}
