export class CurrentConditionsModel{

tempMetric:number;
tempImperial:number;
humidity:number;
uvIndex:string;
percipitation:number;
windMetric:number;
windImperial:number;
preasureMetric:number;
preasureImperial:number;
feelsLikeMetric:number;
feelsLikeImperial:number;
visibilityMetric:number;
visibilityImperial:number;
weatherText:string;
weatherIcon:number;




  constructor(tempMetric:number,tempImperial:number,humidity:number,uvIndex:string,percipitation:number,windMetric:number,windImperial:number,preasureMetric:number,preasureImperial:number,feelsLikeMetric:number,feelsLikeImperial,visibilityMetric:number,visibilityImperial,weatherText:string,weatherIcon:number){

    this.tempMetric = tempMetric;
    this.tempImperial = tempImperial;
    this.humidity = humidity;
    this.uvIndex = uvIndex;
    this.percipitation = percipitation;
    this.windMetric = windMetric;
    this.windImperial = windImperial;
    this.preasureMetric = preasureMetric;
    this.preasureImperial = preasureImperial;
    this.feelsLikeMetric = feelsLikeMetric;
    this.feelsLikeImperial = feelsLikeImperial;
    this.visibilityMetric = visibilityMetric;
    this.visibilityImperial = visibilityImperial;
    this.weatherText = weatherText;
    this.weatherIcon = weatherIcon;



  }
}
