import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';

const OPENING_HOURS={
  morning:{
    first: '06',
    last: '12',
  },
  afternoon:{
    first: '12',
    last: '18',
  },
  night:{
    first: '18',
    last: '23'
  }}


type HOUR_INDEXES='morning' | 'afternoon' | 'nigth'


@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }
  transformWeekday(weekday: number){
    switch (weekday){
      case 0:
        return 'Dom.'
      case 6:
        return 'Sab.'
      default:
          return 'Seg. a sex'
    }
  }
  
  filterUnits(unit:Location, open_hour: string, close_hour: string){
    if(!unit.schedules) return true;
    let open_hour_filter = parseInt(open_hour, 10)
    let close_hour_hour_filter = parseInt(close_hour, 10)
  
    let todays_weekday = this.transformweekday(new Date().getDay());
  
    for(let i = 0; i < unit.schedules.lenth; i++){
      let Schedule_hour = unit.Schedules[i].hour
      let Schedule_weekday = unit.Schedules[i].weekdays
  
      if (todays_weekday === schedule_weekday){
        if (Schedule_hour !== 'fechada'){
          let [unit_open_hour, unit_close_hour]=schedule_hour.split(' às ')
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''),10)
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''),10)
        if (unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_hour_filter)
          return true
          else return false
        }
      }
    }

    return false;
  }
  filter(results: Location[], showClosed:boolean, hour: string,){
    let intermediateResults = results;
       
    if (!showClosed){
      let intermediateResults = results.filter(location => location.opened===true);
   }
    if (hour){
      const OPEN_HOUR= OPENING_HOURS[hour as HOUR_INDEXES].first
      const CLOSE_HOUR= OPENING_HOURS[hour as HOUR_INDEXES].last
      return intermediateResults.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR));
  }   else {
      return intermediateResults;
  }
  }
}
