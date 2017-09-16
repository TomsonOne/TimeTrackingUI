import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

 transform(value: Date, args?: any): any {
    var res = "";
    try {
      var dd = value.getDate().toString();
      var mm = (value.getMonth() + 1).toString();
      var yy = value.getFullYear().toString();
      if(dd.length == 1)
        dd = "0" + dd;
      if(mm.length == 1)
        mm = "0" + mm;
      return dd +  "." + mm + "." + yy;
    } catch (error) {
      return "";
    }
  } 

}
