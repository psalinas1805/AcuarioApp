import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


let apiUrl = 'http://201.238.201.51/MCS/Acuario/AuthServices/api/index.php/';
//let apiUrl = 'http://localhost/Acuario/AuthServices/api/index.php/';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable() 
export class AuthService {

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }
  postData(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }

  
}