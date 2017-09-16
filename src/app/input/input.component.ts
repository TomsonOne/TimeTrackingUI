import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, AfterViewChecked } from '@angular/core';
import * as T from '../shared/types'
import * as _ from 'underscore';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

const now = new Date();

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  projectCtrl: FormControl;
  filteredProjects: any;

  @Input() index: number;
  @Input() dataItem: T.formData;
  @Input() projects: Array<T.project>;
  @Output() dataItemChange: EventEmitter<T.formData> = new EventEmitter<T.formData>();
  @Output() saveItem = new EventEmitter();

  workingPlaces:Array<string> = ["HomeOffice", "Customer"];

  constructor() {
 
    this.projectCtrl = new FormControl();
    this.filteredProjects = this.projectCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));

  }
  
  ngOnInit() {
       
  }
  clickSave(){
    this.saveItem.emit();
  }
  search() {

  }
   filterStates(val: string) {
    return val ? this.projects.filter(s => s.name.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.projects;
  }

}
