import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './login/login.component';
import { InputComponent } from './input/input.component';
import { PiechartsComponent } from './piecharts/piecharts.component';
import { ChartsModule } from 'ng2-charts';
import { DataService } from './shared/data.service';
import { DateFormatter } from './shared/dateformatter';
import { CalculationService } from './shared/calculation.service';
import { HttpModule } from '@angular/http';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './table/table.component';
import { DatePipe } from './pipes/date.pipe';
import { TransformPipe } from './pipes/transform.pipe';
import { StatusPipe } from './pipes/status.pipe';
// import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MD_DATE_FORMATS, MdButtonModule, MdDatepickerModule, MdInputModule, MdNativeDateModule, MdAutocompleteModule, MdSelectModule, DateAdapter, MdProgressBarModule } from '@angular/material';
import { CalculationComponent } from './calculation/calculation.component';

export const APP_DATE_FORMATS =
{
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    LoginComponent,
    InputComponent,
    PiechartsComponent,
    TableComponent,
    DatePipe,
    TransformPipe,
    StatusPipe,
    CalculationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdNativeDateModule,
    MdButtonModule,
    MdInputModule,
    MdDatepickerModule,
    MdAutocompleteModule,
    MdSelectModule,
    MdProgressBarModule
  ],
  providers: [DataService,
    CalculationService, {
      provide: DateAdapter, useClass: DateFormatter
    },
    {
      provide: MD_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }


