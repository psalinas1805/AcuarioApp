import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import { HttpClientModule} from '@angular/common/http';

/*
  Generated class for the WsAcuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WsAcuarioProvider { 
  
  
   constructor(public http: HttpClient) {
    console.log('Hello WsAcuarioProvider Provider');
    //const data = JSON.parse(localStorage.getItem('userData'));
    
  }

  getConfig(idacuario){
    //return this.http.get('http://201.238.201.51/MCS/Acuario/ListenArduino.php?idacuario='+idacuario);
    //return this.http.get('http://happypez.tk/ListenArduino.php?idacuario=1');
    
  }
}
