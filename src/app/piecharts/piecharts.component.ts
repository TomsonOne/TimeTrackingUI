import { Component, OnInit, Input } from '@angular/core';
import { CalculationService } from '../shared/calculation.service';
import * as T from "../shared/types";
import * as _ from 'underscore';
import { Chart } from 'chart.js'


@Component({
  selector: 'piecharts',
  templateUrl: './piecharts.component.html',
  styleUrls: ['./piecharts.component.scss']
})
export class PiechartsComponent implements OnInit {

 pieChartLabels:string[] = [];
  showChart: false;
  text1 = "Booked";
  text2 = "";
  pieChartData:number[] = [];
  pieChartType:string = 'doughnut';
  options:any = {cutoutPercentage: 60, showPercentage : true};
  // private doughnutChartColors: any[] = [{ backgroundColor: ["#a4c73c", "#b8436d",] }];
  // #003A00
  green:string = "#003A00";
  red: string = "#B90000";
  blue:string = "#4000FF";
  // private doughnutChartColors: any[] = [{ backgroundColor: ["#003A00", "#B90000",] }];
  doughnutChartColors: any[] = [{ backgroundColor: [] }]; 
  // [{ backgroundColor: ["#b8436d", "#00d9f9", "#a4c73c", "#a4add3"] }];
  today:Date = new Date();
  target:number;
  actual:number;
  residual:number;
  @Input() scale: string;
  constructor(private _serv: CalculationService) {} 
  
  ngOnInit(){}

  calculateChart(month:number,year:number, activities:Array<T.formData>){

    // This is bad but works, its not working to just initialize these arrays
    if(this.doughnutChartColors[0].backgroundColor.length > 0){
      this.doughnutChartColors[0].backgroundColor.pop()
      this.doughnutChartColors[0].backgroundColor.pop()
      this.pieChartLabels.pop();
      this.pieChartLabels.pop();
    }
   
    if(this.scale == "To Date"){
      this.target = this._serv.getTargetWorkingHoursDayToDate();
      this.actual = this._serv.getActualWorkingHoursDayToDate(activities);
    } else if (this.scale == "Current Week"){
      this.target = this._serv.getTargetWorkingHoursWeek();
      this.actual = this._serv.getActualWorkingHoursWeek(activities);
    } else if (this.scale =="Month"){
      this.target = this._serv.getTargetWorkingHoursMonth(month);
      this.actual = this._serv.getActualWorkingHoursMonth(activities);
    }
    this.residual = this.target - this.actual;

    //round to two digits
    this.residual = Math.round(this.residual* 100) / 100;
    this.actual = Math.round(this.actual* 100) / 100;
    this.text2 = this.residual < 0 ? "Credit" : "Debit"
    this.pieChartLabels.push(this.text1);
    this.pieChartLabels.push(this.text2);
    this.doughnutChartColors[0].backgroundColor.push(this.green);
    if(this.residual < 0) {
       this.doughnutChartColors[0].backgroundColor.push(this.blue);
    } else {
      this.doughnutChartColors[0].backgroundColor.push(this.red);
     
    }
    this.residual = this.residual < 0 ? this.residual * -1 : this.residual

   // this.pieChartData = [100,200]  
     this.pieChartData = [this.actual,this.residual];
  }
}

Chart.plugins.register({
    beforeDraw  : function(chart) {
        var data = chart.data.datasets[0].data;
        var val = (100 * data[0]) / (data[1] + data[0]);
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
        ctx.restore();
        var fontSize = (height / 10).toFixed(2);
        ctx.font = fontSize + "px Arial";
        ctx.fillStyle = "black";
        ctx.textBaseline = "middle";
         
        if(chart.data.labels[1] == "Credit") {              
          val = (100 * data[1]) / (data[0]) + 100;     
        }
        val = Math.round(val* 100) / 100;
        var text = val + '%',
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;    
        
        ctx.fillText(text, textX, textY);   
        ctx.save();
    }
});
