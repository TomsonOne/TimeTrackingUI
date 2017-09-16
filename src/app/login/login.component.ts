import { Component, OnInit, Output,EventEmitter } from '@angular/core';
// import { DataService } from '../shared/data.service';
import * as moment from 'moment'
import * as $ from 'jquery';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.scss'],
  template: `
  <div (click)="onContainerClicked($event)" class="modal fade" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
       [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
    <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Login</h5>
      </div>
      <div class="modal-body">
            <div class="row">        
         <form (submit)="onLoginClick()" (keyup.enter)="onLoginClick()">
                <div class="col-md-6">  
         <input autofocus placeholder="Username" type="text" [(ngModel)]="userName" name="userName" class="form-control noborderradius noborderleft"/>
         </div>  
            <div class="col-md-6">  
         <input placeholder="Password" type="password" [(ngModel)]="password"  name="password" class="form-control noborderradius noborderleft noborderright"/>    
         </div>  
        </form>
        </div>
      </div> 
        <div class="modal-footer">
       <span style="color:red">{{error}}</span> 
        <button type="button" (click)="onLoginClick()" class="btn noborderradius">Login</button>
      </div>
    </div>
  </div>
  `
})
export class LoginComponent implements OnInit {
  userName:string = "";
  password:string = ""; 
  error:string = "";
  visible:boolean = false;
  visibleAnimate:boolean = false;
  @Output() onLogin = new EventEmitter();

  ngOnInit(){
    // this.show();
  }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }
  public onLoginClick(){
    //TODO: Auhorization
    this.error = "noooooooooooo";
    this.hide();
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}