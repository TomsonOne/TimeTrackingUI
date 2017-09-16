import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(parseInt(value) > 2){
      return "Closed"
    } else {
      return "Open"
    }
  }

}
