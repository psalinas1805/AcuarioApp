import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from "ng-socket-io";

/*
  Generated class for the WebsocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebsocketProvider {

  socketStatus = false;
  constructor(public http: HttpClient, 
    private socket: Socket) {
    console.log('Hello WebsocketProvider Provider');
  }
  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;

    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;

    })
  }

  emit( evento: string, payload?: any , callback?: Function){
    console.log('EMITIENDO', evento);  
    this.socket.emit(evento, payload, callback);
  }
   
  listen( evento: string ){
    console.log('RECIBIENDO EVENTO', evento);

    return this.socket.fromEvent( evento );
  }

}
