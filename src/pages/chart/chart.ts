import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import chartJs from 'chart.js';
import { AuthService } from '../../providers/auth_service';
//import { FusionCharts } from  '../../../node_modules/fusioncharts'
/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({

  selector: 'page-chart',
  templateUrl: 'chart.html',
})

export class ChartPage {

  @ViewChild('lineCanvasTemp') lineCanvasTemp;
  @ViewChild('lineCanvasPh') lineCanvasPh;
  public responseChartData: any;
  public dataSet: any;
  public userDetails: any;
  public tokenId: any;


  userPostData = { "user_id": "", "token": "", "category_id": "" };
  lineChartTemp: any;
  lineChartPh: any;
  public dataChart: any;

  public valmintemp = [];
  public valmaxtemp = [];
  public fechatemp = [];
  public valminph = [];
  public valmaxph = [];
  public fechaph = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;




  }


ionViewDidLeave(){
  console.log("Saliendo de Chart");
  
}

  ionViewWillEnter() {
 
  }

  /*ngAfterViewInit() {
  
      
  
      setTimeout(() => {
        
      }, 2000),
        setTimeout(() => {
         
        }, 2000)
      }
  */
  ionViewDidLoad() {
    this.getChartData(1);
    this.getChartData(2);
    setTimeout(()=>{
    this.lineChartTemp = this.getLineChartTemp();
    this.lineChartPh = this.getLineChartPh();
  },1000);
    this.actualizaChart();
  }

actualizaChart(){
  this.getChartData(1);
  this.getChartData(2);
  this.lineChartTemp = this.getLineChartTemp();
  this.lineChartPh = this.getLineChartPh();
}


  getChartData(category_id) {
    this.userPostData.category_id = category_id;
    this.authService.postData(this.userPostData, "chart").then((result) => {

      //console.log(result);
      this.responseChartData = result;
      if (this.responseChartData.chartData) {
        this.dataSet = this.responseChartData.chartData;
        console.log(this.dataSet.length);
        for (let i in this.dataSet) {
          //console.log(this.dataSet[i].valmin);
          if (category_id == 1) {
            this.fechatemp.push(+this.dataSet[i].hora);
            this.valmintemp.push(+this.dataSet[i].valmin);
            this.valmaxtemp.push(+this.dataSet[i].valmax);
          }
          else {
            this.fechaph.push(+this.dataSet[i].hora);
            this.valminph.push(+this.dataSet[i].valmin);
            this.valmaxph.push(+this.dataSet[i].valmax);
          }
        }

      }
      else {
        console.log("No Access on getChart");
      }

    }, (err) => {
      //Connection failed message
    });
  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType
    })
  }
  getLineChartTemp() {

    console.log("Creando Chart...");


    const data = {
      labels: this.fechatemp,
      datasets: [{
        label: 'Mínima',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgb(0,178,255)',
        borderColor: 'rgb(0,178,255)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1,
        pointHitRadius: 1,
        data: this.valmintemp,
        scanGaps: true,
      }, {
        label: 'Máxima',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgb(170,0,49)',
        borderColor: 'rgb(170,0,49)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1,
        pointHitRadius: 1,
        data: this.valmaxtemp,
        scanGaps: true,
      }
      ]
    }

    return this.getChart(this.lineCanvasTemp.nativeElement, 'line', data)
  }

  getLineChartPh() {

    console.log("Creando Chart...");


    const data = {
      labels: this.fechaph,
      datasets: [{
        label: 'Mínimo',
        fill: false,
        lineTension: 0.2,
        backgroundColor: 'rgb(0,178,255)',
        borderColor: 'rgb(0,178,255)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1,
        pointHitRadius: 1,
        data: this.valminph,
        scanGaps: false,
      }, {
        label: 'Máximo',
        fill: false,
        lineTension: 0.2,
        backgroundColor: 'rgb(170,0,49)',
        borderColor: 'rgb(170,0,49)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1,
        pointHitRadius: 1,
        data: this.valmaxph,
        scanGaps: false,
      }
      ]
    }
    return this.getChart(this.lineCanvasPh.nativeElement, 'line', data)
  }

}
