import { NativeDateAdapter } from "@angular/material";
import * as moment from 'moment';

export class DateFormatter extends NativeDateAdapter {

    format(date: Date, displayFormat: Object): string {     
        if (displayFormat === 'input') {
            if (date === null) {
            return '';
        }
        let momentFormat = "dddd, DD.MM.YYYY";
        let d = moment({ year: date.getFullYear(), 
                         month: date.getMonth(), 
                         date: date.getDate() });
        return d.isValid() ? d.format(momentFormat) : '';
        } else {
            return date.toDateString();
        }
    }
}
