import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WsAcuarioProvider } from '../../providers/ws-acuario/ws-acuario'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth_service';

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
  public userDetails: any;
  public responseConfigData: any;
  userPostData = { "user_id": "", "token": "", "idacuario": "" };
  configAcuario
  toGetData
  dataSet
  myForm: FormGroup;
  valueY;
  valueN;
  responseStateData
  configState

  setArt = { "user_id": "0", "idacuario": "0", "art": "1", "nvalue": "ON" };

  configArtefact = {
    calefactor: false,
    ventilador: false,
    filtroagua: false,
    aire: false,
    luz: false
  }
  configInit = {
    user_id: 0,
    idacuario: 0,
    itempmin: 0,
    itempmax: 0,
    iphmin: 0,
    iphmax: 0,
    iluzdiamin: '',
    iluzdiamax: '',
    iluznochemin: '',
    iluznochemax: '',
    iairemin: '',
    iairemax: '',
    ifiltromin: '',
    ifiltromax: '',
    inivelagua: ''
  };
  data = {
    Calefactor: false,
    Ventilador: false,
    Filtro: true,
    Oxigenador: true,
    Luz: true,
  };
  visible = true;
  manual = false;
  edit = false;
  toggleDiv() {
    this.visible = !this.visible;
    this.manual = !this.manual;
  }


  editDiv() {
    this.edit = !this.edit;
    this.getLastConfigNew();
    //console.log(this.configAcuario);
  }





  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public proveedor: WsAcuarioProvider,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public authService: AuthService
  ) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.idacuario = this.userDetails.idacuario;
    this.setArt.user_id = this.userDetails.user_id;
    this.setArt.idacuario = this.userDetails.idacuario;

  }

  ionViewWillEnter() {
    setInterval(() => {

      if (this.edit == false) {
        this.getLastConfigNew();
      }
      this.getState();
    }, 10000);

  }

  ionViewDidLoad() {
    console.log("ejecutara getLastConfigNew");
    this.getLastConfigNew();
    console.log("creara myForm");
    this.myForm = this.createMyForm();
    this.getState();

  }



  getLastConfigNew() {
    console.log("dentro de LastConfigNew");

    this.configAcuario

    this.authService.getConfig(this.userPostData, "getConfig").then((result) => {
      this.responseConfigData = result;

      if (this.responseConfigData.configData) {
        this.configAcuario = this.responseConfigData.configData;

        for (let i in this.configAcuario) {


          if (this.configAcuario[i].param == "tempmin") {
            this.configInit.itempmin = +this.configAcuario[i].value;
          }
          else if (this.configAcuario[i].param == "tempmax") {
            this.configInit.itempmax = +this.configAcuario[i].value;
          }
          else if (this.configAcuario[i].param == "phmin") {
            this.configInit.iphmin = +this.configAcuario[i].value;
          }
          else if (this.configAcuario[i].param == "phmax") {
            this.configInit.iphmax = +this.configAcuario[i].value;
          }
          else if (this.configAcuario[i].param == "luzdiamin") {
            this.configInit.iluzdiamin = this.configAcuario[i].value;
          }
          else if (this.configAcuario[i].param == "luzdiamax") {
            this.configInit.iluzdiamax = this.configAcuario[i].value;
          }
          else if (this.configAcuario[i].param == "luznochemin") {
            this.configInit.iluznochemin = this.configAcuario[i].value;
          }
          else if (this.configAcuario[i].param == "luznochemax") {
            this.configInit.iluznochemax = this.configAcuario[i].value;
          }
          else if (this.configAcuario[i].param == "airemin") {
            this.configInit.iairemin = this.configAcuario[i].value;
          }
          else if (this.configAcuario[i].param == "airemax") {
            this.configInit.iairemax = this.configAcuario[i].value;
          }
          else if (this.configAcuario[i].param == "filtromin") {
            this.configInit.ifiltromin = this.configAcuario[i].value;
          }
          else if (this.configAcuario[i].param == "filtromax") {
            this.configInit.ifiltromax = this.configAcuario[i].value;
          }
          else if (this.configAcuario[i].param == "nivelagua") {
            this.configInit.inivelagua = this.configAcuario[i].value;
            if (this.configAcuario[i].value == "Y") {
              this.valueY = true;
              this.valueN = false;
            }
            else {
              this.valueY = false;
              this.valueN = true;
            }
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

  private createMyForm() {
    return this.formBuilder.group({
      user_id: this.userDetails.user_id,
      idacuario: this.userDetails.idacuario,
      tempmin: ['', Validators.required],
      tempmax: ['', Validators.required],
      phmin: ['', Validators.required],
      phmax: ['', Validators.required],
      luzdiamin: ['', Validators.required],
      luzdiamax: ['', Validators.required],
      luznochemin: ['', Validators.required],
      luznochemax: ['', Validators.required],
      airemin: ['', Validators.required],
      airemax: ['', Validators.required],
      filtromin: ['', Validators.required],
      filtromax: ['', Validators.required],
      nivelagua: ['', Validators.required]
    });

  }

  saveData() {
    console.log(this.myForm.value);
    this.authService.setConfig(this.myForm.value, "setConfig")
    this.doAlert();
    this.edit = false;
    this.getLastConfigNew()
  }


  doAlert() {
    let alert = this.alertCtrl.create({
      title: 'Configuraciones',
      message: 'Sus configuraciones han sido guardadas exitósamente',
      buttons: ['Aceptar']
    });
    alert.present();
  }


  getState() {
    this.authService.getConfig(this.userPostData, "getState").then((result) => {
      this.responseStateData = result;

      if (this.responseStateData.stateData) {
        this.configState = this.responseStateData.stateData;

        for (let i in this.configState) {
          if (this.configState[i].description == "Calefactor") {
            this.configArtefact.calefactor = this.booleano(this.configState[i].state);
          }
          else if (this.configState[i].description == "Ventilador") {
            this.configArtefact.ventilador = this.booleano(this.configState[i].state);
          }
          else if (this.configState[i].description == "Filtro") {
            this.configArtefact.filtroagua = this.booleano(this.configState[i].state);
          }
          else if (this.configState[i].description == "Luz") {
            this.configArtefact.luz = this.booleano(this.configState[i].state);
          }
          else if (this.configState[i].description == "Aireador") {
            this.configArtefact.aire = this.booleano(this.configState[i].state);
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


  setState(param, nvalue) {

    nvalue = this.palabra(nvalue);
    this.setArt.user_id = this.userDetails.user_id;
    this.setArt.idacuario = this.userDetails.idacuario;
    this.setArt.art = param;
    this.setArt.nvalue = nvalue;

    console.log(this.setArt);

    this.authService.setConfig(this.setArt, "setState");
  }

  booleano(campo) {
    if (campo == "ON") {
      return true;
    }
    else {
      return false;
    }
  }

  palabra(campo) {
    if (campo == true) {
      return "ON";
    }
    else {
      return "OFF";
    }
  }
}
