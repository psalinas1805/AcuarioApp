import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


//let apiUrl = 'http://happypez.cf/AuthServices/api/index.php/';
let apiUrl = 'http://happypez.cf:3000/';
//let apiUrl = 'http://localhost:3000/';
let headers = new Headers({'Content-Type': 'application/json'});
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
      //let headers = new Headers({'Content-Type': 'application/json'});
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }

  getConfig(credentials, type){
    
    return new Promise((resolve, reject) =>{
      //let headers = new Headers({'Content-Type': 'application/json'});
      console.log(apiUrl+type+JSON.stringify(credentials));
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
        //console.log("3getconfig");
      }, (err) =>{
        reject(err);
      });

    });
  }

  setConfig(newConfig, type){
    //console.log("1 setConfig");
    return new Promise((resolve, reject) =>{
      //let headers = new Headers({'Content-Type': 'application/json'});
      this.http.post(apiUrl+type, JSON.stringify(newConfig), {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });
  }
  

  getAlimentoList(idacuario, method){
    console.log("getAlimento Nuevo");
    let userData = {'idacuario':''}
    userData.idacuario = idacuario;
    let body = JSON.stringify(userData);
    //let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(apiUrl + method, body, {headers})
        .map( res=>{
          //console.log(res.json);
          return res.json();
        });
  }

  addAlimento(data, method){
    console.log("AddAlimento Nuevo");
    
    let body = JSON.stringify(data);
    //let headers = new Headers();

    return this.http.post(apiUrl + method, body, {headers})
        .map( res=>{
          //console.log(res.json);
          return res.json();
        });
  }

  deleteAlimento(data, method){
    console.log("getAlimento Nuevo");
    //let userData = {'idacuario':''}
    //userData.idacuario = idacuario;
    let body = JSON.stringify(data);
    //let headers = new Headers();

    return this.http.post(apiUrl + method, body, {headers})
        .map( res=>{
          //console.log(res.json);
          return res.json();
        });
  }

}