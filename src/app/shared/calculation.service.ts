import {Injectable } from '@angular/core';
import * as _ from 'underscore';
import * as types from "../shared/types";
import * as moment from 'moment'

@Injectable()
export class CalculationService {
  holidayData: any;
  accountData: any;
  constructor() {
    this.holidayData = this.getHolidays();
  }
  getTargetWorkingHoursDayToDate() {
    var currentDay = new Date().getDate();
    var day = 1;
    var currentMonth = new Date().getMonth();
    var workingDayCount = 0;
    while (day <= currentDay) {
      var date = new Date(new Date().getFullYear(), currentMonth, day);
      var dayInWeek = date.getDay();
      var dateConv = moment(date).format("YYYY-MM-DD");
      if (dayInWeek != 6 && dayInWeek != 0 && this.holidayData[dateConv] != true) {
        workingDayCount++;
      }
      day++
    }
    return workingDayCount * 8;
  }
  getFirstAndLastDay(month: any, year: number) {
    var firstDay = new Date(year, month, 1).toISOString().slice(0, 10).replace(/-/g, "-");;
    var lastDay = new Date(year, parseInt(month) + 1, 0).toISOString().slice(0, 10).replace(/-/g, "-");;
    return {
      0: firstDay,
      1: lastDay
    }
  }
  getActualWorkingHoursDayToDate(data: Array<types.formData>) {
    var workingHours = 0;
    _.each(data, function (item) {
      workingHours += item.hours
    });
    return workingHours;
  }
  getTargetWorkingHoursWeek() {
    var date = new Date();
    var currentDay = date.getDay();
    var currentWeek = this.getWeekFromDate(new Date());
    var week = currentWeek;
    var diff = date.getDate() - currentDay + (currentDay == 0 ? -6 : 1);
    var workingDayCount = 0;
    //firstDayWeek
    var dayOfWeek = new Date(date.setDate(diff));
    while (currentWeek == week) {
      week = this.getWeekFromDate(dayOfWeek);
      if (currentWeek == week) {
        var dayTomorrow = dayOfWeek.getDay();
        var dateConv = moment(dayOfWeek).format("YYYY-MM-DD");
        if (dayTomorrow != 6 && dayTomorrow != 0 && this.holidayData[dateConv] != true) {
          workingDayCount++;
        }
      }
      var ms = dayOfWeek.getTime() + 86400000;
      dayOfWeek = new Date(ms);
    }
    return workingDayCount * 8
  }
  getActualWorkingHoursWeek(data: Array<types.formData>) {
    var workingHours = 0;
    var currentWeek = this.getWeekFromDate(new Date());
    var res = _.each(data, (item) => {
      var week = this.getWeekFromDate(item.date);
      if (week == currentWeek) {
        workingHours += item.hours
      }
    });
    return workingHours;
  }
  getTargetWorkingHoursMonth(currentMonth: any) {
    var date = new Date();
    var month = parseInt(currentMonth);
    var workingDayCount = 0;
    var firstDay = new Date(date.getFullYear(), month, 1);
    var lastDay = new Date(date.getFullYear(), month + 1, 0);
    var calendarDays = lastDay.getDate() - firstDay.getDate() + 1;
    for (var i = 0; i < calendarDays; i++) {
      var day = firstDay.getDay();
      var dateConv = moment(firstDay).format("YYYY-MM-DD");
      var isHoliday = this.holidayData[dateConv];
      if (day != 6 && day != 0 && isHoliday != true) {
        workingDayCount++;
      }
      var ms = firstDay.getTime() + 86400000;
      firstDay = new Date(ms);

    }
    return workingDayCount * 8;
  }
  getActualWorkingHoursMonth(data: Array<types.formData>) {
    let total = 0;
    _.each(data, function (item) {
      total += item.hours
    });
    return total;
  }
  getHolidays() {
    let year = new Date().getFullYear();
    let raw2017 = { "Neujahrstag": { "datum": "2017-01-01", "hinweis": "" }, "Karfreitag": { "datum": "2017-04-14", "hinweis": "" }, "Ostermontag": { "datum": "2017-04-17", "hinweis": "" }, "Tag der Arbeit": { "datum": "2017-05-01", "hinweis": "" }, "Christi Himmelfahrt": { "datum": "2017-05-25", "hinweis": "" }, "Pfingstmontag": { "datum": "2017-06-05", "hinweis": "" }, "Fronleichnam": { "datum": "2017-06-15", "hinweis": "" }, "Tag der Deutschen Einheit": { "datum": "2017-10-03", "hinweis": "" }, "Reformationstag": { "datum": "2017-10-31", "hinweis": "" }, "Allerheiligen": { "datum": "2017-11-01", "hinweis": "" }, "1. Weihnachtstag": { "datum": "2017-12-25", "hinweis": "" }, "2. Weihnachtstag": { "datum": "2017-12-26", "hinweis": "" } };
    let raw2018 = { "Neujahrstag": { "datum": "2018-01-01", "hinweis": "" }, "Karfreitag": { "datum": "2018-03-30", "hinweis": "" }, "Ostermontag": { "datum": "2018-04-02", "hinweis": "" }, "Tag der Arbeit": { "datum": "2018-05-01", "hinweis": "" }, "Christi Himmelfahrt": { "datum": "2018-05-10", "hinweis": "" }, "Pfingstmontag": { "datum": "2018-05-21", "hinweis": "" }, "Fronleichnam": { "datum": "2018-05-31", "hinweis": "" }, "Tag der Deutschen Einheit": { "datum": "2018-10-03", "hinweis": "" }, "Allerheiligen": { "datum": "2018-11-01", "hinweis": "" }, "1. Weihnachtstag": { "datum": "2018-12-25", "hinweis": "" }, "2. Weihnachtstag": { "datum": "2018-12-26", "hinweis": "" } };
    let raw2019 = { "Neujahrstag": { "datum": "2019-01-01", "hinweis": "" }, "Karfreitag": { "datum": "2019-04-19", "hinweis": "" }, "Ostermontag": { "datum": "2019-04-22", "hinweis": "" }, "Tag der Arbeit": { "datum": "2019-05-01", "hinweis": "" }, "Christi Himmelfahrt": { "datum": "2019-05-30", "hinweis": "" }, "Pfingstmontag": { "datum": "2019-06-10", "hinweis": "" }, "Fronleichnam": { "datum": "2019-06-20", "hinweis": "" }, "Tag der Deutschen Einheit": { "datum": "2019-10-03", "hinweis": "" }, "Allerheiligen": { "datum": "2019-11-01", "hinweis": "" }, "1. Weihnachtstag": { "datum": "2019-12-25", "hinweis": "" }, "2. Weihnachtstag": { "datum": "2019-12-26", "hinweis": "" } };
    let holidayData = {
      2017: raw2017,
      2018: raw2018,
      2019: raw2019
    }
    let res = {};
    for (var key in holidayData[year]) {
      res[holidayData[year][key].datum] = true;
    }
    return res;
  }
  getWeekFromDate(_this) {
    var target = new Date(_this.valueOf());
    var dayNr = (_this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);

    if (target.getDay() != 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }

    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  }
  getSundayFromWeekNum(weekNum, year) {
    var sunday = new Date(year, 0, (1 + (weekNum - 1) * 7));
    while (sunday.getDay() !== 0) {
      sunday.setDate(sunday.getDate() - 1);
    }
    return sunday;
  }
  getTargetHoursFromWeek(currentWeek: number, currentMonth: number) {
    var week = currentWeek;
    var month = currentMonth;
    var workingDayCount = 0;
    var dayOfWeek = this.getSundayFromWeekNum(currentWeek, 2017);
    while (currentWeek == week) {
      var ms = dayOfWeek.getTime() + 86400000;
      dayOfWeek = new Date(ms);
      week = this.getWeekFromDate(dayOfWeek);
      month = dayOfWeek.getMonth();
      if (currentWeek == week && month == currentMonth) {
        var dayTomorrow = dayOfWeek.getDay();
        //TODO: check for holidays 
        var dateConv = moment(dayOfWeek).format("YYYY-MM-DD");
        // var dateConv = dayOfWeek.toISOString().slice(0,10).replace(/-/g,"-");
        if (dayTomorrow != 6 && dayTomorrow != 0 && this.holidayData[dateConv] != true) {
          workingDayCount++;
        }
      }
    }
    return workingDayCount * 8
  }

  convertWeeklyListData(data: Array<types.formData>, selectedMonth:number): Array<types.weekData> {
    let res = new Array<types.weekData>();
    let tmp: types.weekData;
    for (var i = 0; i < data.length; i++) {
      let ci = data[i];
      let week = this.getWeekFromDate(ci.date);
      let weekTargetHours = this.getTargetHoursFromWeek(week, selectedMonth);

      //if current weekData is null create new object
      if (tmp == null) {
        tmp = new types.weekData();
        tmp.week = week;
        tmp.weekTargetHours = weekTargetHours;
        tmp.formData = new Array<types.formData>();
      }
      tmp.formData.push(ci);
      if (i == (data.length - 1) || week != this.getWeekFromDate(data[i + 1].date)) {
        res.push(tmp);
        tmp = null;
      }
    }

    return res;
  }
  convertListData(raw: Array<any>): Array<types.formData> {
    let res = new Array<types.formData>();
    for (var i = 0; i < raw.length; i++) {
      let ci = raw[i];
      let newItem: types.formData = {
        id: ci.id,
        description: ci.description,
        date: new Date(ci.date),
        hours: ci.hours,
        workingPlace: ci.workingPlace,
        projectName: ci.project.name,
        projectId: ci.project.id,
        isLoading: false,
        isEditing: false,
        isDirty: false
      }
      res.push(newItem);
    }
    return res;
  }
  prePareAccounts(rawData: Array<any>): Array<types.project> {
    let projects: Array<types.project> = [];
    _.each(rawData, function (item) {
      var customerOpt: types.project = {
        name: item.name,
        id : item.id,
        costumer: item.costumer
      }
        projects.push(customerOpt);
    });
    return projects;
  }

  getWeekTotal(days: Array<types.formData>) {
    let res = 0;
    for (var i = 0; i < days.length; i++) {
      res = res + days[i].hours;
    }
    return res;
  }
  getMonthArray() {
    var retObj: Array<types.month> = [
      { text: 'January', id: 0 },
      { text: 'February', id: 1 },
      { text: 'March', id: 2 },
      { text: 'April', id: 3 },
      { text: 'May', id: 4 },
      { text: 'June', id: 5 },
      { text: 'July', id: 6 },
      { text: 'August', id: 7 },
      { text: 'September', id: 8 },
      { text: 'October', id: 9 },
      { text: 'November', id: 10 },
      { text: 'Dezember', id: 11 }
    ];
    return retObj;
  }
}
