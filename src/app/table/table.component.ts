import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { DataService } from '../shared/data.service';
import * as T from "../shared/types";
import * as _ from 'underscore';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  constructor(private _service:DataService) { }
  currentDate:Date;
  currentDate2:Date;
  @Input()data:Array<T.weekData> = [];
  @Input()projects:Array<T.project> = [];
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onClose = new EventEmitter();
  // @Output() onDownload = new EventEmitter();
  ngOnInit() {}
  getCssClass(even, editing){
    let res = "";
    if(even){
      res += "even-row ";
    } else {
      res += "odd-row ";
    }
    if(editing)
      res += "booked-row ";
      
    return res;
  } 
  getColorcodeClass(data:Array<T.formData>,item:T.formData){
    var day = item.date.getDay();
    var hours = this.getActualHoursOfDay(data, item);
    if(hours == 8) {
      return "greenAccent";
    } else if (hours > 8) {
      return "blueAccent"
    } else if (hours < 8) {
      return "greyAccent"
    } 
     
    
  }
  getDayName(item:T.formData){
     var day = item.date.getDay();
    var className = "";
    switch(day){
      case 0:
       className = "sunday";
        break;
      case 1:
        className = "monday";
        break;
      case 2:
      className = "tuesday";
        break;
      case 3:
      className = "wednesday";
        break;
      case 4:
      className = "thursday";
        break;
      case 5:
      className = "friday";
        break;
      case 6:
      className = "saturday";
        break;
    }
    return className;
  }
  getRowSpan(data:Array<T.formData>,item:T.formData){   
    var rowspan = _.filter(data, (a) => {
      if(this.compareDates(item.date, a.date))
        return true;
    }).length;
     this.currentDate = item.date;
     
     return rowspan;


     
  }
  getActualHoursOfDay(data:Array<T.formData>,item:T.formData){
    var dayData = _.filter(data, (a) =>{
          if(this.compareDates(a.date, item.date))
            return true;
       });
      var hours = 0;
      _.each(dayData, function(i) {
        hours += i.hours;
      });
       return hours; 
  }
  hideForRowSpan(item:T.formData){
    if(!this.checkIfOneEntry(item) && this.compareDates(item.date, this.currentDate2))
    {
      this.currentDate2 = item.date;
      return false;       
    }
    this.currentDate2 = item.date;
    return true;
    
  }
  checkIfOneEntry(item){    
      if(this.data.length == 1){
        var grouped = _.groupBy(this.data[0].formData,'date'); 
        if(Object.keys(grouped).length ==1){
          var firstItem = this.data[0].formData[0];
          if(item.id == firstItem.id){
            return true;
          } else {
            return false;
          }
        }
       } 
      return false;
  }
  getWeekTotal(days:Array<T.formData>){
    let res = 0;
    for(var i = 0; i < days.length; i++){
      res = res + days[i].hours;
    }
    return Math.round(res* 100) / 100;;
  } 
  onEditBooking(booking:T.formData){
    this.onEdit.emit(booking);
  } 
  onDeleteBooking(booking:T.formData){
    this.onDelete.emit(booking);
  } 
  onCloseBooking(booking:T.formData){
    this.onClose.emit(booking);
  }
  compareDates(d1:Date, d2:Date){
    var equal = true;  
    if(d1 == null || d2 == null){
      equal = false;
    }  else {
      if(d1.getDate() != d2.getDate())
        equal = false;
      if(d1.getMonth() != d2.getMonth())
        equal = false;
      if(d1.getFullYear() != d2.getFullYear())
        equal = false;  
      }
     return equal;
   
  }
}
