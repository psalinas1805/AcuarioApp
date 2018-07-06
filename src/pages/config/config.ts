import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WsAcuarioProvider } from '../../providers/ws-acuario/ws-acuario'
/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {
  visible = true;
  toggleDiv(){
    this.visible =!this.visible;
  }
  configAcuario
  constructor(public navCtrl: NavController, public navParams: NavParams, public proveedor:WsAcuarioProvider) {}

  ionViewDidLoad(){
    this.proveedor.getConfig()
    .subscribe(
      (data)=>{this.configAcuario = data;},
      (error)=>{console.log(error);}
    )
}
}
