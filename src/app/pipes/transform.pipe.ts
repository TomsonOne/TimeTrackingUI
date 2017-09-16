import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'transform'
})
export class TransformPipe implements PipeTransform {

  transform(value: any,type:string, args?: any, ): any {
   var retValue;
   switch (type) {
     case "accounts":
      _.each(args, function(account:any) {
          if(account.id == value) {
             retValue = account.name;
          }        
        });
       break;
   
     default:
       break;
   } 
    return retValue;
  }

}
