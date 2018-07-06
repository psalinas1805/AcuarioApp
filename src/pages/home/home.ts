import { Component } from '@angular/core';
import { NavController, App, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
//import { WelcomePage } from'../welcome/welcome';
import { FCM } from '@ionic-native/fcm';
import { AuthService } from '../../providers/auth_service';


declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public responseChartData: any;
  public valtemp = 0;
  public valph = 0;
  public dataSet: any;
  public userDetails: any;
  public tokenId: any;
  public category_id: number;
  public nombre: string;
  public delay: number = 10000;
x: number = 0;

  userPostData = { "user_id": "", "token": "", "category_id": "" };


  constructor(public navCtrl: NavController,
    public app: App,
    platform: Platform,
    private fcm: FCM,
    public authService: AuthService) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    if (platform.is('cordova')) {

      this.fcm.getToken().then(token => {
        //backend.registerToken(token);
        alert("Token del dispositivo " + token);
        console.log("Token del dispositivo" + token);
        this.tokenId = token;
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
    
  }

ionViewWillEnter(){
    this.showChartTemp();
    this.showChartPh();
    
}

  showChartTemp() {
    var dataTemp = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Temperatura', this.valtemp],
    ]);

    var optionsTemp = {
      greenFrom: 20, greenTo: 25,
      redFrom: 25, redTo: 40,
      yellowFrom: 0, yellowTo: 20,
      minorTicks: 5,
      max: 40
    };
    var chartTemp = new google.visualization.Gauge(document.getElementById('chart-container'));
    chartTemp.draw(dataTemp, optionsTemp);
    setInterval(() => {
      this.getDataTempPh();
      dataTemp.setValue(0, 1, this.valtemp);
      chartTemp.draw(dataTemp, optionsTemp);
    }, this.delay);
  }

  showChartPh() {
    
    console.log("Ejecutando showChartPh");
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
      console.log("delay" ,  this.delay);
    }, this.delay);
    
  }

  backToWelcome() {

  }

  logout() {
    //Api Token
    localStorage.clear();
    const root = this.app.getRootNav();
    root.popToRoot(LoginPage);
  }

  getDataTempPh() {
    this.userPostData.category_id = ""
    this.authService.postData(this.userPostData, "chartTempPh").then((result) => {
      //console.log(result);
      this.responseChartData = result;
      if (this.responseChartData.chartData) {
        this.dataSet = this.responseChartData.chartData;
        //console.log(this.dataSet.length);
        for (let i in this.dataSet) {
          //console.log(this.dataSet[i].category_idcategory, this.dataSet[i].value);
          if (this.dataSet[i].category_idcategory == 1) {
            this.valtemp = +this.dataSet[i].value;
            console.log("ValTemp en getdata", this.valtemp);
          }
          else if (this.dataSet[i].category_idcategory == 2) {
            this.valph = +this.dataSet[i].value;
            console.log("Valph en getdata", this.valph);
          }
        }

      }
      else {
        console.log("No Access on getChartTempPh");
      }

    }, (err) => {
      //Connection failed message
    });
  }

}


