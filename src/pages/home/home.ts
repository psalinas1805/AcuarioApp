import { Component } from '@angular/core';
import { NavController, App, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
//import { WelcomePage } from'../welcome/welcome';
import { FCM } from '@ionic-native/fcm';
import { AuthService } from '../../providers/auth_service';
import { WsAcuarioProvider } from '../../providers/ws-acuario/ws-acuario';

//declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public responseChartData: any;
  public tempstate = "red";
  public phstate = "red";
  public valtemp = 0;
  public valph = 0;
  public valnivel: any;
  public dataSet: any;
  public userDetails: any;
  public tokenId: any;
  public category_id: number;
  public nombre: string;
  public delay: number =5000;
  x: number = 0;
  public dateRegistro: any;
  public stateRed = false;
  public tempClassRow = "";
  public phClassRow = "";
  public nivelClassRow = "";
  public semaforo = "";
  public iconoTemp = "";
  public iconoPh ="";
  public iconoNivel ="";
  public configAcuario;
  responseStateData
  configState
  public configInit = {
    itempmin: 0,
    itempmax: 0,
    iphmin: 0,
    iphmax: 0
    
  }
  configArtefact = {
    calefactor: false,
    ventilador: false,
    filtroagua: false,
    aire: false,
    luz: false
  }

  data = {
    Calefactor: false,
    Ventilador: false,
    Filtro: true,
    Oxigenador: true,
    Luz: true,
  };

  userPostData = { "user_id": "", "token": "", "category_id": "" };
  userStateData = { "user_id": "", "token": "", "idacuario": "" };
  userTokenPush = { "user_id": "", "token": "", "tokenPush": "" };

  constructor(public navCtrl: NavController,
    public app: App,
    platform: Platform,
    private fcm: FCM,
    public authService: AuthService,
    public proveedor:WsAcuarioProvider
    
  ) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.userStateData.user_id = this.userDetails.user_id;
    this.userStateData.token = this.userDetails.token;
    this.userStateData.idacuario = this.userDetails.idacuario;

    this.userTokenPush.user_id = this.userDetails.user_id;
    this.userTokenPush.token = this.userDetails.token;
    

    //console.log("Ejecutando getdata on constructor");
    this.getDataTempPh();
    this.getState();

    if (platform.is('cordova')) {

      this.fcm.getToken().then(token => {
        //backend.registerToken(token);
        alert("Token del dispositivo " + token);
        console.log("Token del dispositivo" + token);
        this.userTokenPush.tokenPush = token;
        this.setToken();
      });

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log("Received in background");
          alert("Received in background");
        } else {
          console.log("Received in foreground");
          alert("Received in foreground");
        };
      });
    }

  }

  ionViewCanEnter(){
    
    
  }

  ionViewDidLoad() {

    
    this.userPostData.category_id = ""

    setInterval(() => {
      //this.getLastConfig(); 
      this.getDataTempPh();
      this.getState();
      
    }, 3000);   
  }

ionViewWillEnter(){
    

}
/*
  showChartTemp() {
    //console.log("Ejecutando showChartTemp");
    

    var dataTemp = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Temperatura', this.valtemp],
    ]);

    
    var optionsTemp = {
      greenFrom: this.configInit.itempmin, greenTo: this.configInit.itempmax,
      redFrom: this.configInit.itempmax, redTo: 40,
      yellowFrom: 0, yellowTo: this.configInit.itempmin,
      minorTicks: 5,
      max: 40
    };
    //var chartTemp = new google.visualization.Gauge(document.getElementById('chart-container'));
    //chartTemp.draw(dataTemp, optionsTemp);
    setInterval(() => {
      this.getLastConfig(); 
      this.getDataTempPh();
      dataTemp.setValue(0, 1, this.valtemp);
      //chartTemp.draw(dataTemp, optionsTemp);
    }, this.delay);
  }*/


  /*
  showChartPh() {
    
    //console.log("Ejecutando showChartPh");
    var dataPh = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Ph', this.valph],

    ]);

    var optionsPh = {
      greenFrom: 5, greenTo: 8,
      redFrom: 8, redTo: 14,
      yellowFrom: 0, yellowTo: 5,
      minorTicks: 5,
      max: 14
    };
    var chartPh = new google.visualization.Gauge(document.getElementById('chart-container2'));
    
    chartPh.draw(dataPh, optionsPh);
    
    setInterval( () => {   
     
      this.getDataTempPh();
      dataPh.setValue(0, 1, this.valph);
      chartPh.draw(dataPh, optionsPh);

    }, this.delay);
    
  }*/

  backToWelcome() {

  }

  logout() {
    //Api Token
    localStorage.clear();
    const root = this.app.getRootNav();
    root.popToRoot(LoginPage);
  }

  getDataTempPh() {
    
    this.userPostData.category_id = "";
    this.authService.postData(this.userPostData, "chartTempPh").then((result) => {
      //console.log(result);
      this.responseChartData = result;
      if (this.responseChartData.chartData) {
        this.dataSet = this.responseChartData.chartData;
        //console.log(this.dataSet.length);
        this.stateRed = false;

        
        this.iconoTemp="checkmark";
        this.iconoPh="checkmark";
        this.iconoNivel ="checkmark";
        this.tempClassRow,this.phClassRow,this.nivelClassRow ="";
        this.semaforo="assets/img/semVerde.png";
        
        for (let i in this.dataSet) {
          //console.log(this.dataSet[i].description, this.dataSet[i].value, this.dataSet[i].state);
          if (this.dataSet[i].description == "Temperatura") {
            this.valtemp = +this.dataSet[i].value;
            this.dateRegistro = this.dataSet[i].dateRegistro;
            //console.log("ValTemp en getdata", this.valtemp) ;
            if(this.dataSet[i].state=="red"){
              this.tempClassRow="row-red row";
              this.iconoTemp="close-circle";
            }
            else{
              this.tempClassRow="";
              this.iconoTemp="checkmark";
            
            }
            
          }
          else if (this.dataSet[i].description == "Ph") {
            this.valph = +this.dataSet[i].value;
            //console.log("Valph en getdata", this.valph);
            if(this.dataSet[i].state=="red"){
              this.phClassRow="row-red row";
              this.iconoPh="close-circle";
            }
            else{
              this.phClassRow="";
              this.iconoPh="checkmark";
            }
          }
          else if (this.dataSet[i].description == "Nivel de agua") {
            this.valnivel = this.dataSet[i].value;
            if(this.dataSet[i].state=="red"){
              this.nivelClassRow="row-red row";
              this.iconoNivel="close-circle";
            }
            else{
              this.nivelClassRow="";
              this.iconoNivel="checkmark";
            }
            //console.log("ValNivel en getdata", this.valnivel);
          }
          if (this.dataSet[i].state == "red"){
            this.semaforo="assets/img/semRojo.png";
          }
          
        }
        this.stateRed = false;

      }
      else {
        console.log("No Access on getChartTempPh");
      }

    }, (err) => {
      //Connection failed message
    });
    
  }

  /* getLastConfig(){
    this.proveedor.getConfig(this.userDetails.idacuario)
    .subscribe(
      (data)=>{this.configAcuario = data;},
      (error)=>{console.log(error);
      }
    )
  
    for (let i in this.configAcuario) {
      //console.log("config:" + this.configAcuario[i].description, this.configAcuario[i].valuemin);
      if (this.configAcuario[i].description == "Temperatura") {
        this.configInit.itempmin = +this.configAcuario[i].valuemin;
        this.configInit.itempmax = +this.configAcuario[i].valuemax;
      }
      
      else if (this.configAcuario[i].description == "Ph") {
        this.configInit.iphmin = +this.configAcuario[i].valuemin;
        this.configInit.iphmax = +this.configAcuario[i].valuemax;
      }
    }
    //console.log("itempmin: " + this.configInit.itempmin);

  
  }*/


  getState() {
    console.log("dentro de getState");


    this.authService.getConfig(this.userStateData, "getState").then((result) => {
      this.responseStateData = result;

      if (this.responseStateData.stateData) {
        this.configState = this.responseStateData.stateData;

        for (let i in this.configState) {
          if (this.configState[i].description == "Calefactor") {
            this.configArtefact.calefactor = this.validador(this.configState[i].state);
          }
          else if (this.configState[i].description == "Ventilador") {
            this.configArtefact.ventilador = this.validador(this.configState[i].state);
          }
          else if (this.configState[i].description == "Filtro") {
            this.configArtefact.filtroagua = this.validador(this.configState[i].state);
          }
          else if (this.configState[i].description == "Luz") {
            this.configArtefact.luz = this.validador(this.configState[i].state);
          }
          else if (this.configState[i].description == "Aireador") {
            this.configArtefact.aire = this.validador(this.configState[i].state);
          }
        }
      }
      else {
        console.log("No se obtuvieron datos");
      }

    }, (err) => {
      //Connection failed message
    });

  }


  setToken() {
    console.log(this.userTokenPush);
    this.authService.setConfig(this.userTokenPush, "setTokenPush");
  }


  validador(campo) {
    if (campo == "ON") {
      return true;
    }
    else {
      return false;
    }

  }



  
}


