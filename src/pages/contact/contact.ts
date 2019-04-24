import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WsAcuarioProvider } from '../../providers/ws-acuario/ws-acuario'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  configAcuario
  myVal: any;

  constructor(public navCtrl: NavController,public proveedor:WsAcuarioProvider) {
    window.open("http://005onps.nwsvr1.com", "_self");
  }
  ionViewDidLoad(){
  /*  this.proveedor.getConfig(1)
    .subscribe(
      (data)=>{this.configAcuario = data;},
      (error)=>{console.log(error);}
    )*/
} 

}
