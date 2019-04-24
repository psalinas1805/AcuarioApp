import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { WebsocketProvider } from './websocket/websocket';




//let apiUrl = 'http://happypez.cf/AuthServices/api/index.php/';
let apiUrl = 'http://happypez.cf:3000/';
let headers = new Headers({'Content-Type': 'application/json'});
/*
  Generated class for the AuthService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable() 
export class AuthService {

  constructor(public http: Http, public wsService: WebsocketProvider) {
    
    console.log('Hello AuthService Provider');
  }



getMessage(){
  return this.wsService.listen('mensaje-nuevo');
}

getAlimentoSocket(){
  return this.wsService.listen('alimentoList');
}



loginWS(credentials){

  return new Promise ( ( resolve, reject, ) =>{
  console.log("Emitiendo  login credenciales", credentials);
  
    this.wsService.emit('login',  credentials , ( res ) =>{
      resolve(res);
    });
  });

 }

  postData(credentials, type){
    console.log("enviando ", type);
    
    return new Promise((resolve, reject) =>{
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers})
      .subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }

  getConfig(credentials, type){
    
    return new Promise((resolve, reject) =>{
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers})
      .map(x => x).subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });
    });
  }

  setConfig(newConfig, type){
    return new Promise((resolve, reject) =>{
      this.http.post(apiUrl+type, JSON.stringify(newConfig), {headers: headers})
      .subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });
    });
  }
  

  getAlimentoList(idacuario, method){
    let userData = {'idacuario':''};
    userData.idacuario = idacuario;
    let body = JSON.stringify(userData);

    return this.http.post(apiUrl + method, body, {headers})
        .map( res=>{
          return res.json();
        });
  }

  addAlimento(data, method){
    
    let body = JSON.stringify(data);

    return this.http.post(apiUrl + method, body, {headers})
        .map( res=>{
          return res.json();
        });
  }

  deleteAlimento(data, method){   
    let body = JSON.stringify(data);

    return this.http.post(apiUrl + method, body, {headers})
        .map( res=>{
          return res.json();
        });
  }

}