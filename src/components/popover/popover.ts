import { Component ,ViewChild, OnInit, } from '@angular/core';
import { FormGroup,  } from "@angular/forms";
import { Platform, ViewController, NavParams } from 'ionic-angular';


/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent implements OnInit{
  @ViewChild('input') myInput ;
  
  forma: FormGroup;
  editAlimentoPop ={
    id: 0,
    hora: "00:00",
    porcion: 1
  };
  android = false;
  valid = false;
  msg = { id: 0, number: 0, text: "", timestamp : Date.now()};
  constructor(platform: Platform, public viewCtrl: ViewController,public navParams:NavParams) {

    
    this.editAlimentoPop = this.navParams.get('eli');
    //this.editAlimento.hora = this.navParams.get('hora');
    //this.editAlimento.porcion = this.navParams.get('porcion');
    console.log('Hello PopoverComponent Component');
    console.log(`id alimento ${this.editAlimentoPop} `);
    
  }


  ngOnInit() {

 /*    setTimeout(() => {
      this.myInput.setFocus();
    },500); */

 }

  send() {


    console.log(this.editAlimentoPop);

    this.viewCtrl.dismiss(this.editAlimentoPop);
  }

  backEdit() {

    console.log("Cancelado desde popover");

    this.viewCtrl.dismiss(false);
  }

}
