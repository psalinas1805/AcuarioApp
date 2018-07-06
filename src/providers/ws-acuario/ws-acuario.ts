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
    
  }

  getConfig(){
    return this.http.get('http://201.238.201.51/MCS/Acuario/ListenArduino.php?idacuario=1');
    //return this.http.get('http://localhost/Acuario/ListenArduino.php?idacuario=1');
    
  }
}
