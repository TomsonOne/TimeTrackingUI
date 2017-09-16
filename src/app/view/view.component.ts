import { Component, OnInit, ViewChildren, QueryList, ViewChild, ChangeDetectorRef } from '@angular/core';
import * as T from '../shared/types';
import { DataService } from '../shared/data.service';
import { CalculationService } from '../shared/calculation.service';
import * as _ from 'underscore';
import * as moment from 'moment';
import { PiechartsComponent } from '../piecharts/piecharts.component';
import { InputComponent } from '../input/input.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
 
  showApp: boolean;
  showTable: boolean;

  selectedMonth: number;
  months: Array<T.month> = [];

  show: boolean = true;
 
  formData: Array<T.formData> = [];
  weeklyActivities: Array<T.weekData> = [];
  items: Array<T.formData> = [];

  projects: Array<T.project> = [];
  isEdit: boolean = false;
  isLoading: boolean = false;
 

  @ViewChildren(PiechartsComponent) PieCharts: QueryList<PiechartsComponent>
  @ViewChildren(InputComponent) inputFormComponent: QueryList<InputComponent>

  constructor(private _serv: DataService, private _cal: CalculationService, private _cd: ChangeDetectorRef) {
    this.showApp = false;
    this.showTable = true;
    this.months = _cal.getMonthArray();

    this.selectedMonth = moment().month();
    this.formData.push(new T.formData);
  }

  ngOnInit() {
    //  this.token = window.localStorage.getItem("token"); 
    //  var timestamp = moment(window.localStorage.getItem("token-timestamp")); 
    //  var expiredHours = moment().diff(timestamp, 'hours');
    // this.load();
    this.selectedMonth = 7;
    var that = this;
    
    setTimeout(function () {
      that._serv.getItems().then(activityResult => {
        that.items = that._cal.convertListData(activityResult);
        that.weeklyActivities = that._cal.convertWeeklyListData(that.items, this.selectedMonth);
        that.calculateCharts();

        that._serv.getAccounts().then(result => {
          that.projects = that._cal.prePareAccounts(result);
          // this.displayAccounts = this._cal.prepareDisplayAccounts(activityResult, this.accounts);
      console.log(that.projects)
          that._cd.detectChanges();
          //  setTimeout(function(){
          //         $('#monthpicker').selectpicker();
          //     }, 500); 
        }).catch(error => {
          console.log(error);
        });






      }).catch(error => {
        console.log(error);
      });
    }, 0);


  }
  // loadAccounts() {
  //   this._serv.getAccounts().then(result => {
  //     this.accounts = this._cal.prePareAccounts(result);
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // }
  // load(){  
  // //  this._serv.getActivities(this.selectedMonth).then(activityResult => {   
  //     this.activities = this._cal.convertListData(activityResult);
  //     this.weeklyActivities = this._cal.convertWeeklyListData(this.activities, this.selectedMonth);     
  //       this._serv.getAccounts().then(result => {
  //       this.accounts = this._cal.prePareAccounts(result);
  //       this.displayAccounts = this._cal.prepareDisplayAccounts(activityResult,this.accounts);         
  //       this.showApp = true;
  //       this.showTable = true; 
  //       this.calculateCharts();
  //       this._cd.detectChanges();
  //       //  setTimeout(function(){
  //       //         $('#monthpicker').selectpicker();
  //       //     }, 500); 
  //       }).catch(error => {
  //         console.log(error);
  //       });
  //     }).catch(error => {
  //        console.log(error);
  //  });
  // }
  
  setProductId(data:T.formData){
    var project = _.find(this.projects, {name: data.projectName});
    data.projectId = project ? project.id : 0;
  
  }
  onChangeMonth() {
    this.showTable = false;
    // this.load();
  }
  destroyInput(index: number) {
    this.formData.splice(index, 1);
    if (this.formData.length == 0) {
      this.formData.push(new T.formData);
    }
  }
  onLoginSuccessful(eMail) {
    // this.eMail = eMail;
    // this.load();
  }
  // clickCopyButton() {
  //   let item: T.formData = this.formData[this.formData.length - 1];
  //   let newItem: T.formData = Object.assign({}, item);
  //   //TODO: Implement next working day method
  //   let newDate = new Date(item.date.getTime() + (1 * 24 * 60 * 60 * 1000));
  //   newItem.date = newDate;
  //   this.formData.push(newItem);

  // }
  // clickAddButton() {
  //   let item: T.formData = this.formData[this.formData.length - 1];
  //   let newItem: T.formData = new T.formData();
  //   newItem.date = item.date;
  //   this.formData.push(newItem);
  // }
  handleEdit(booking: T.formData) {
    // this.editItem = Object.assign({}, booking);
    // this.formData = [];
    // this.formData.push(booking);
    // // check if anything is currently edited and set false
    // _.each(this.weeklyActivities, week => {
    //   _.each(week.formData, item => {
    //     item.isEditing = false;
    //   })
    // })
    // this.isEdit = true;
    // booking.isEditing = true;

  }
  
  handleDelete(booking: T.formData) {
    // var text = moment(booking.date).format("DD.MM.YYYY") + " - " + booking.hours + " Hours";
    booking.isLoading = true;
    this._serv.deleteItem(booking).then(result => {
      // this._notificationService.success("Deleted",text);
      console.log(this.items)
      console.log(booking)
      this.items = _(this.items).filter(function (item) {
        return item.id != booking.id
      });
      this.weeklyActivities = this._cal.convertWeeklyListData(this.items, this.selectedMonth);
      this.calculateCharts();
      booking.isLoading = false;
    }).catch(error => {
      booking.isLoading = false;
      //  this._notificationService.error("Error Deleting",text);
    });

  }
  clickSaveButton() {
   
    // this.isLoading = true;
    // var abort = false;
    // this.inputFormComponent.forEach((item) => {
    //   if (item.dataItem.description == null || item.dataItem.description == "") {
    //     item.descriptionMissing = true
    //     setTimeout(function () {
    //       item.descriptionMissing = false
    //     }, 3000);
    //     abort = true;
    //   }
    //   if (item.dataItem.hours == 0 || isNaN(item.dataItem.hours)) {
    //     item.zeroHours = true
    //     setTimeout(function () {
    //       item.zeroHours = false
    //     }, 3000);
    //     abort = true;
    //   }
    // });
    // if (!abort) {
    //   this.addActivity(this.formData, 0);
    // } else {
    //   this.isLoading = false;
    // }
  }
  saveItem(){
   
    let currentItem = this.formData[0];   
    this.setProductId(currentItem);   
    this._serv.saveActivity(currentItem).then(result => {
        // this._notificationService.success("Success",text);
        currentItem.id = result;
        this.items.push(currentItem);
        this.items = _.sortBy(this.items, function (item) { return -item.date; });
        this.weeklyActivities = this._cal.convertWeeklyListData(this.items, this.selectedMonth);
      }).catch(e => {
        // this._notificationService.error("Error","Account invalid or maximum reached");
        // clear saved items
    
        // this.load();
      });
    this.formData = [];
    this.formData.push(new T.formData());

  }
  // addActivity(data: Array<T.formData>, index: number) {
  //   data[index].isLoading = true;
  //   // var text = moment(data[index].date).format("DD.MM.YYYY") + " - " + data[index].hours + " Hours";
  //   if (!this.isEdit) {
  //     var saveCount = 0;
  //     this._serv.saveActivity(data[index]).then(result => {
  //       // this._notificationService.success("Success",text);
  //       data[index].id = result.id;
  //       data[index].isLoading = false;
  //       data[index].isDirty = true;
  //       this.items.push(data[index]);


  //       let newIndex = index + 1;
  //       if (newIndex < data.length) {
  //         this.addActivity(data, newIndex);
  //       } else {
  //         this.clearAndReload();
  //       }
  //     }).catch(e => {
  //       // this._notificationService.error("Error","Account invalid or maximum reached");
  //       this.isLoading = false;
  //       // clear saved items
  //       this.formData = _.filter(data, function (item) {
  //         return !item.isDirty;
  //       });
  //       // this.load();
  //     });
  //   } else {
  //     this._serv.editActivity(data[index]).then(result => {
  //       // this._notificationService.success("Changed",text);         
  //       this.clearAndReload();
  //       this.isEdit = false;
  //       data[index].isLoading = false;
  //       data[index].isEditing = false;
  //     });

  //   }
  // }
  clearAndReload() {
    // this.activities = _.sortBy(this.activities, function (activity) { return -activity.date; });
    // // this.weeklyActivities = this._cal.convertWeeklyListData(this.activities, this.selectedMonth);
    // this.calculateCharts();
    // this.animationIndex = [];
    // this.formData = [];
    // this.formData.push(new T.formData);
    // this.isLoading = false;
  }
  clickDiscard() {
    // this.animationIndex = [];
    // this.formData = [];
    // this.formData.push(new T.formData);
    // this.isEdit = false;
    // _.each(this.weeklyActivities, week => {
    //   _.each(week.formData, item => {
    //     //reset all item properties
    //     if (item.isEditing) {
    //       item.description = this.editItem.description
    //       item.account = this.editItem.account
    //       item.hours = this.editItem.hours
    //       item.date = this.editItem.date
    //       item.work = this.editItem.work
    //       item.isEditing = false;
    //     }

    //   })
    // })

  }
  calculateCharts() {
    this.PieCharts.forEach((item) => {
      item.calculateChart(this.selectedMonth, 2017, this.items);
    });
  }

}
