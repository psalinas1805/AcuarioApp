import { Component } from '@angular/core';
import {NavController, IonicPage, AlertController, ToastController, MenuController } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {AuthService} from '../../providers/auth_service';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  
  
  constructor(
    public navCtrl: NavController, 
    public authService:AuthService, 
    public forgotCtrl: AlertController,
    public menu: MenuController, 
    private toastCtrl:ToastController) {
    this.menu.swipeEnable(false);
    
  }

  resposeData :any;
  userData = {"username":"", "password":""};

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    }

    login(){
      console.log('Loggeandose con el usuario ', this.userData);
      
      this.authService.loginWS( this.userData )
      .then((res) =>{
        console.log("dentro de login - ", res);
        
        if( res ){ 
          console.log("ingresa al if");
          localStorage.setItem('userData', JSON.stringify(res) );
          this.navCtrl.push(TabsPage);
        }
        else{
          this.presentToast("Usuario y/o contraseña invalidos");
        }
      });
    }

  login2() {
    console.log('login');
    
    if(this.userData.username && this.userData.password){
      //Api connections
    this.authService.postData(this.userData, "login").then((result) =>{
    this.resposeData = result;
    if(this.resposeData.userData){
      console.log(this.resposeData);
      localStorage.setItem('userData', JSON.stringify(this.resposeData) )
      this.navCtrl.push(TabsPage);
    }
    else{
      this.presentToast("Usuario y/o contraseña invalidos");
    }
    
    }, (err) => {
      //Connection failed message
    });
  }
  else {
    console.log("Give valid information.");
  }
  
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
