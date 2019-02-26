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
  id:number;
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
  responseStateDataAlimento
  configStateAlimento
  editAlimentoList
  editAlimento

  setArt = { "user_id": "0", "idacuario": "0", "art": "1", "nvalue": "ON" };
  setAli = { "user_id": "0", "idacuario": "0", "idalimento": "1", "nvalue": "true" };
  setModeData= { "user_id": "0", "idacuario": "0", "param": "0" };

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
  
  alimentoList = [
    {idalimento: 0,
    idacuario: 0,
    hora: '',
    porcion: 0,
    habilitado: '',
    estado: ''
    }];

  

  visible = true;
  manual = false;
  edit = false;
  editAli = false;

  toggleDiv(mode) {
    this.visible = !this.visible;
    this.manual = !this.manual;
    if  (mode === "AUTO"){
      console.log("Automatico");
      this.setMode(mode);
    }
    else if (mode === "MANUAL"){
      console.log("Manual");
      
    }
    
  }


  editDiv() {
    this.edit = !this.edit;
    this.getLastConfigNew();
    //console.log(this.configAcuario);
  }

  editDivAli(idalimento) {
    
    this.editAli = !this.editAli;

    for (let i in this.alimentoList) {
      if (this.alimentoList[i].idalimento == idalimento) {
        this.editAlimento = this.alimentoList[i];
        console.log(this.editAlimento)
      }
    }

  }

  backEdit(){
    this.editAli = !this.editAli;
  }


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public proveedor: WsAcuarioProvider,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    public authService: AuthService
  ) {
    this.id = navParams.get('id');
    //console.log("id recibido es: " + this.id);
    
    const data = JSON.parse(localStorage.getItem('userData'));
    
    this.userDetails = data.userData;
    this.userDetails.idacuario=JSON.parse(localStorage.getItem('idacuario'));
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.userPostData.idacuario = JSON.parse(localStorage.getItem('idacuario'));
    this.setArt.user_id = this.userDetails.user_id;
    this.setArt.idacuario = JSON.parse(localStorage.getItem('idacuario'));

  }

  ionViewWillEnter() {
    this.userDetails.idacuario=JSON.parse(localStorage.getItem('idacuario'));
    this.setArt.idacuario = JSON.parse(localStorage.getItem('idacuario'));
    this.userPostData.idacuario = JSON.parse(localStorage.getItem('idacuario'));

    console.log("BBBBBBBBBBBBBBBBBBBBB: " + this.userDetails.idacuario);

    setInterval(() => {

      if (this.edit == false) {
        this.getLastConfigNew();
        this.getAlimentoList();

      }
      this.getState();
    }, 50000);

  }

  ionViewDidLoad() {
    this.userDetails.idacuario=JSON.parse(localStorage.getItem('idacuario'));
    this.setArt.idacuario = JSON.parse(localStorage.getItem('idacuario'));
    this.userPostData.idacuario = JSON.parse(localStorage.getItem('idacuario'));
    
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA: " + this.userDetails.idacuario);

    //console.log("ejecutara getLastConfigNew");
    this.getLastConfigNew();
    this.getAlimentoList();
    //console.log("creara myForm");
    this.myForm = this.createMyForm();
    this.getState();


  }


  

  getLastConfigNew() {
    this.userDetails.idacuario=JSON.parse(localStorage.getItem('idacuario'));
    this.setArt.idacuario = JSON.parse(localStorage.getItem('idacuario'));
    this.userPostData.idacuario = JSON.parse(localStorage.getItem('idacuario'));

    //console.log("dentro de LastConfigNew");
    this.userDetails.idacuario
    this.configAcuario

    console.log("CCCCCCC Buscara config de acuario: " + this.userPostData.idacuario);
       

    this.authService.getConfig(this.userPostData, "getConfig").then((result) => {
      this.responseConfigData = result;

      if (this.responseConfigData.configData) {
        this.configAcuario = this.responseConfigData.configData;

        for (let i in this.configAcuario) {



          if (this.configAcuario[i].param == "tempmin") {
            this.configInit.itempmin = +this.configAcuario[i].value;
            console.log(this.configInit.itempmin)
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
      phmin: ['', [Validators.required, Validators.min(0), Validators.max(14)]],
      phmax: ['', [Validators.required,  Validators.min(0), Validators.max(14)]],
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

  addAlimento(){
    
    this.userPostData.idacuario = JSON.parse(localStorage.getItem('idacuario'));
    
    let data = {"user_id":this.userPostData.user_id,"idacuario":this.userPostData.idacuario}

    
    this.doAlert("Alimento agregado","Configura la hora y porcion de alimentacion");
    this.authService.addAlimento(data, 'addAlimento')
      .subscribe(data => {
        let response = data.response;
        console.log("Respuesta ADD ALIMENTO" + response);
      });
    this.getAlimentoList();
    
  }

  getAlimentoList(){
    console.log("Buscando alimento");
    this.userPostData.idacuario = JSON.parse(localStorage.getItem('idacuario'));
    this.authService.getAlimentoList(this.userPostData.idacuario, 'getAlimentoList')
      .subscribe(data => {
        this.alimentoList = data.alimentoList;
        console.log(this.alimentoList);
      });
  }

  async deleteAlimento(idalimento){
    console.log("Eliminando alimento");

    this.userPostData.idacuario = JSON.parse(localStorage.getItem('idacuario'));
    let dataDeleteAlimento = {"user_id":this.userPostData.user_id,"idacuario":this.userPostData.idacuario, "idalimento":idalimento}

    const alert = await  this.alertCtrl.create({
      title: 'Eliminar Alimento!',
      message: 'Esta seguro de eliminar este alimento?!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.doAlert("Operacion cancelada","");
          }
        }, {
          text: 'Si',
          handler: () => {
            this.authService.deleteAlimento(dataDeleteAlimento, 'deleteAlimento')
            .subscribe(data => {
              let response = data.response;
              console.log( " Delete alimento response: " + response );
            });
      
            this.getAlimentoList();
            console.log('Confirm Okay');
            this.doAlert("Eliminar alimento!","Se ha eliminado exitosamente!");
          }
        }
      ]
    });

    await alert.present();


  }
  
  saveData() {
    console.log(this.myForm.value);
    this.authService.setConfig(this.myForm.value, "setConfig")
    this.doAlert("Configuración","Su configuración ha sido guardada!");
    this.edit = false;
    this.getLastConfigNew()
  }


  saveDataAli() {
    console.log(this.editAlimento);
    this.authService.setConfig(this.editAlimento, "editAlimento")
    this.doAlert("Alimentacion","Su configuracion ha sido guardada!");
    this.editAli = false;
  }

  doAlert(title,message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  


  getState() {
    this.userDetails.idacuario=JSON.parse(localStorage.getItem('idacuario'));
    this.setArt.idacuario = JSON.parse(localStorage.getItem('idacuario'));
    this.userPostData.idacuario = JSON.parse(localStorage.getItem('idacuario'));

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

      if (this.configArtefact.aire == true || this.configArtefact.luz == true || this.configArtefact.filtroagua == true || this.configArtefact.ventilador == true || this.configArtefact.calefactor == true){
        this.manual = true;
      }
      else {
        console.log("No se obtuvieron datos");
      }

    }, (err) => {
      //Connection failed message
    });
  }


  setState(param, nvalue) {
    this.userDetails.idacuario=JSON.parse(localStorage.getItem('idacuario'));
    this.userPostData.idacuario = JSON.parse(localStorage.getItem('idacuario'));

    nvalue = this.palabra(nvalue);
    this.setArt.user_id = this.userDetails.user_id;
    this.setArt.idacuario = JSON.parse(localStorage.getItem('idacuario'));
    this.setArt.art = param;
    this.setArt.nvalue = nvalue;

    console.log(this.setArt);

    this.authService.setConfig(this.setArt, "setState");
  }

  setStateAlimento(param, nvalue) {
    this.userDetails.idacuario=JSON.parse(localStorage.getItem('idacuario'));
    //nvalue = this.palabra(nvalue);
    this.setAli.user_id = this.userDetails.user_id;
    this.setAli.idacuario = JSON.parse(localStorage.getItem('idacuario'));
    this.setAli.idalimento = param;
    this.setAli.nvalue = nvalue;

    console.log(this.setAli);

    this.authService.setConfig(this.setAli, "setStateAlimento");
  }

  booleano(campo) {
    if (campo == "ON") {
      return true;
    }
    else {
      return false;
    }
  }

  setMode(mode) {

    this.userDetails.idacuario=JSON.parse(localStorage.getItem('idacuario'));

    this.setModeData.user_id = this.userDetails.user_id;
    this.setModeData.idacuario = JSON.parse(localStorage.getItem('idacuario'));
    this.setModeData.param = mode;
    
    console.log(this.setModeData);

    this.authService.setConfig(this.setArt, "setMode");
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
