import { Injectable } from '@angular/core';
import * as types from "../shared/types";
import { Http, Headers } from "@angular/http";
import * as _ from 'underscore';
import { CalculationService } from "./calculation.service";

@Injectable()
export class DataService {
 // environment: string = "http://nc-timetracking.azurewebsites.net";
   environment:string = "http://localhost:5000";
  constructor(private http: Http, private calc: CalculationService) { }
  getToken(userName, password): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let url = this.environment + "/api/login";
      let header = new Headers({
        "accept": "application/json;odata=verbose",
        "content-type": "application/json"
      });
      this.http.post(url, { Name: userName, Password: password }, { headers: header }).subscribe(s => {
        let res = s.json();
        if (res.error == null) {
          window.localStorage.setItem("token", res.access_token);
          window.localStorage.setItem("token-timestamp", new Date().toISOString());
          window.localStorage.setItem("email", res.userName);

          resolve(res.userName);
        } else {
          reject(res.error_description)
        }
      });
    });
  }
  getItems(): Promise<any> {
    return new Promise<any>((resolve, reject) => {  
      let url = "http://localhost:5000/api/items/1";
      let header = new Headers({
        "accept": "application/json;odata=verbose",
        "content-type": "application/json"
      });
      this.http.get(url,{headers: header}).subscribe(s => {    
         
          let res = s.json(); 
          if(res.error == null){
        
             resolve(res);
          } else {
            reject(res.error_description)
          }
      });
    });


  }
  getAccounts(): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      //  let url = "http://localhost:51125/api/accounts/";
      let url =  "http://localhost:5000/api/projects";


      let header = new Headers({
        "accept": "application/json;odata=verbose",
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
        // "Authorization": "Bearer " + token
      });
      this.http.get(url, { headers: header }).subscribe(s => {
        let res = s.json();
        if (res.error == null) {
          resolve(res);
          
        } else {
          reject(res.error_description)
        }
      });
    });
  }
  saveActivity(item: types.formData): Promise<any> {
    
    return new Promise<any>((resolve, reject) => {
       let url =  "http://localhost:5000/api/items";
      let header = new Headers({
        "accept": "application/json;odata=verbose",
        "content-type": "application/json"
      });
      
      this.http.post(url, item, { headers: header }).subscribe(s => {
       console.log(s.json())
        if (s.status == 200) {
          resolve(s.json());
        } else {
          reject();
        }
      }, error => {
        reject(error);
      });
    });
  }
  deleteItem(item: types.formData): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let url =  "http://localhost:5000/api/items/" + item.id;
      
      // let url = "";
      let header = new Headers({
        "accept": "application/json;odata=verbose",
        "content-type": "application/json"
      });
      this.http.delete(url, { headers: header }).subscribe(s => {
        if (s.status == 200) {
          resolve(s);
        } else {
          reject(s.statusText);
        }

      }, error => {
        reject(error);
      });
    });
  }
  closeActivity(activity: types.formData): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let url = this.environment + "/api/activities/close/" + activity.id;
      let token = window.localStorage.getItem("token");
      let header = new Headers({
        "accept": "application/json;odata=verbose",
        "content-type": "application/json",
        "Authorization": "Bearer " + token
      });
      this.http.put(url, null, { headers: header }).subscribe(s => {
        if (s.status == 200) {
          resolve(s);
        } else {
          reject(s.statusText);
        }
      }, error => {
        reject(error);
      });
    });
  }
  editActivity(activity: types.formData): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let url = this.environment + "/api/activities/edit/" + activity.id;
      let token = window.localStorage.getItem("token");
      let header = new Headers({
        "accept": "application/json;odata=verbose",
        "content-type": "application/json",
        "Authorization": "Bearer " + token
      });
      this.http.put(url, activity, { headers: header }).subscribe(s => {
        if (s.status == 200) {
          resolve(s);
        } else {
          reject(s.statusText);
        }
      }, error => {
        reject(error);
      });
    });
  }
  getCSV(month: number, year: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let token = window.localStorage.getItem("token");
      let url = this.environment + "/api/download/" + year + "/" + month + "/export.csv?token=" + token
      let header = new Headers({
        "accept": "application/json;odata=verbose",
        "content-type": "application/json",
        "Authorization": "Bearer " + token
      });
      this.http.get(url, { headers: header }).subscribe(s => {
        if (s.status == 200) {
          resolve(s);
        } else {
          reject(s.statusText);
        }
      }, error => {
        reject(error);
      });
    });
  }
}