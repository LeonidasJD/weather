import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-week-temp',
  templateUrl: './week-temp.component.html',
  styleUrls: ['./week-temp.component.css']
})
export class WeekTempComponent {

  constructor(){}



  daysOfWeek:Date[] = [];

  ngOnInit(){

   for(let i = 0; i < 7; i++) {
     const day = new Date();
     day.setDate(day.getDate() + i);
     this.daysOfWeek.push(day);
     }


   }

}
